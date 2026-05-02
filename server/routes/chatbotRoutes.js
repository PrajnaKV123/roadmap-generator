const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 10000; // 10 seconds to avoid quota limits

const systemPrompt = `You are an AI Career Mentor for PathMind, a platform that helps users create personalized learning roadmaps. You are an expert career counselor and technical mentor.

Your role is to provide intelligent, actionable guidance on:
- Learning path recommendations
- Technology stack suggestions
- Interview preparation
- Project ideas for resumes
- Career development advice
- Skill gap analysis
- Coding best practices
- Industry trends

Guidelines:
- Be encouraging and supportive
- Provide specific, actionable advice
- Include relevant examples when helpful
- Suggest concrete next steps
- Keep responses focused and not too long
- Use markdown formatting for better readability
- Be honest about what you don't know
- Always maintain a professional, helpful tone

If asked about specific technologies, provide accurate, current information. If the question is unclear, ask for clarification.

Remember: You're helping users build their careers through structured learning paths.`;

async function callWithRetry(genAI, question, retries = MAX_RETRIES) {
  try {
const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: {
        role: "system",
        parts: [{ text: systemPrompt }],
      },
    });

    // Configure to use v1 API explicitly
    const Harmlessness = {
      harmCategory: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_NONE",
    };

    // Generate content with proper content format for v0.24.x
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: question }] }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    });
    return result;
  } catch (error) {
    const isRateLimited =
      error.message?.includes("quota") ||
      error.message?.includes("rate") ||
      error.message?.includes("429") ||
      error.message?.includes("RESOURCE_EXHAUSTED");

    if (isRateLimited && retries > 0) {
      const delay = INITIAL_RETRY_DELAY * (MAX_RETRIES - retries + 1);
      console.log(`Rate limited. Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return callWithRetry(genAI, question, retries - 1);
    }
    throw error;
  }
}

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    console.log("Chatbot request received:", { question });
    console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "YES" : "MISSING");

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Failed to get AI response",
        message: "API key is not configured on the server.",
        timestamp: new Date(),
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Call the retry function with genAI instance and question
    const result = await callWithRetry(genAI, question);
    const aiResponse = result.response.text();

    if (!aiResponse || aiResponse.trim().length === 0) {
      throw new Error("AI returned an empty response.");
    }

    console.log("Chatbot response generated, length:", aiResponse.length);

    res.json({
      response: aiResponse,
      timestamp: new Date(),
    });

  } catch (error) {
    console.error("Chatbot API Error:", error.message);

    let errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again later.";

    if (error.message?.includes("API_KEY") || error.message?.includes("API key")) {
      errorMessage = "API configuration issue. Please contact support.";
    } else if (error.message?.includes("quota") || error.message?.includes("rate") || error.message?.includes("429")) {
      errorMessage = "Too many requests right now. Please wait a moment and try again.";
    } else if (error.message?.includes("not found") || error.message?.includes("404")) {
      errorMessage = "AI model not found. Please contact support.";
    }

    res.status(500).json({
      error: "Failed to get AI response",
      message: errorMessage,
      timestamp: new Date(),
    });
  }
});

module.exports = router;