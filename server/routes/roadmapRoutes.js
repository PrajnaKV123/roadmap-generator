// server/routes/roadmapRoutes.js

const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Roadmap = require("../models/Roadmap");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function normalizeChecklistText(line) {
  return line.replace(/^\s*(?:\d+[\).:-]|\*|\-|\•|\–)\s*/g, "").trim();
}

function parseRoadmapToChecklist(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const candidateSteps = lines
    .map((line) => {
      const cleaned = normalizeChecklistText(line);
      return {
        raw: line,
        cleaned,
      };
    })
    .filter(({ cleaned }) => cleaned.length > 0);

  const explicitSteps = candidateSteps.filter(({ raw, cleaned }) => {
    return (
      /^(?:\d+[\).:-]|\*|\-|\•|\–)/.test(raw) ||
      /^(?:step|learn|build|practice|use|project|complete|review|study)/i.test(cleaned) ||
      cleaned.length <= 120
    );
  });

  const entries = explicitSteps.length >= 3 ? explicitSteps : candidateSteps;

  return Array.from(new Set(entries.map(({ cleaned }) => cleaned)))
    .slice(0, 12)
    .map((text) => ({ text, completed: false }));
}

function calculateProgress(checklist) {
  if (!Array.isArray(checklist) || checklist.length === 0) {
    return 0;
  }

  const completed = checklist.filter((item) => item.completed).length;
  return Math.round((completed / checklist.length) * 100);
}

router.post("/generate", async (req, res) => {
  try {
const { skill, level, duration, goal, userId } = req.body;

    if (!skill || !level || !duration) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const prompt = `
Create a clear step-by-step learning roadmap for:

Skill: ${skill}
Current Level: ${level}
Learning Duration: ${duration}
Career Goal: ${goal || "Not specified"}

Please provide:

1. Step-by-step learning stages
2. Important tools, technologies, and concepts to learn
3. Projects to build for practical learning
4. Career guidance and preparation tips
5. Best learning resources for each stage including:
   - Free courses
   - YouTube tutorials
   - Official documentation
   - Practice platforms
   - Project ideas

Make the roadmap:
- simple
- practical
- beginner-friendly
- student-friendly
- clearly structured

Format the response in a clean and readable way.
`;

const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const checklist = parseRoadmapToChecklist(text);
    const progress = calculateProgress(checklist);

    const savedRoadmap = await Roadmap.create({
      userId,
      skill,
      level,
      duration,
      goal,
      roadmap: text,
      checklist,
      progress,
    });

    res.status(200).json({
      roadmap: text,
      savedRoadmap,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.message);

    if (error.status === 404) {
      return res.status(404).json({
        message:
          "Model not found. Try updating your @google/generative-ai package.",
      });
    }

    res.status(500).json({
      message: "Roadmap generation failed",
      error: error.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().sort({ createdAt: -1 });

    res.status(200).json(roadmaps);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch roadmaps",
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const roadmaps = await Roadmap.find({ userId }).sort({ createdAt: -1 });
    const updatedRoadmaps = [];

    for (const roadmap of roadmaps) {
      let changed = false;

      if (!Array.isArray(roadmap.checklist) || roadmap.checklist.length === 0) {
        roadmap.checklist = parseRoadmapToChecklist(roadmap.roadmap);
        changed = true;
      }

      const newProgress = calculateProgress(roadmap.checklist);
      if (roadmap.progress !== newProgress) {
        roadmap.progress = newProgress;
        changed = true;
      }

      if (changed) {
        await roadmap.save();
      }

      updatedRoadmaps.push(roadmap);
    }

    res.status(200).json(updatedRoadmaps);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch roadmaps",
    });
  }
});

router.patch("/:roadmapId/checklist", async (req, res) => {
  try {
    const { roadmapId } = req.params;
    const { itemIndex, completed, userId } = req.body;

    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    if (userId && roadmap.userId.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (
      !Array.isArray(roadmap.checklist) ||
      roadmap.checklist[itemIndex] === undefined
    ) {
      return res.status(400).json({ message: "Checklist item not found" });
    }

    roadmap.checklist[itemIndex].completed = Boolean(completed);
    roadmap.progress = calculateProgress(roadmap.checklist);
    await roadmap.save();

    res.status(200).json(roadmap);
  } catch (error) {
    res.status(500).json({ message: "Failed to update checklist" });
  }
});

module.exports = router;