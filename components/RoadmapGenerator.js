// components/RoadmapGenerator.jsx

"use client";

import { useState } from "react";
import axios from "axios";

export default function RoadmapGenerator() {
  const [formData, setFormData] = useState({
    skill: "",
    level: "",
    duration: "",
    goal: "",
  });

  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Get user from localStorage to retrieve userId
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Please login to generate a roadmap");
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id;

      const res = await axios.post(
        "http://localhost:5000/api/roadmap/generate",
        { ...formData, userId }
      );

      localStorage.setItem("generatedRoadmap", res.data.roadmap);
      localStorage.setItem("selectedSkill", formData.skill);

      window.location.href = "/generated-roadmap";
    } catch (err) {
      alert(err.response?.data?.message || "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#a36b40] font-semibold text-lg mb-2">
            Personalized Learning
          </p>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#6f3011]"
            style={{ fontFamily: "serif" }}
          >
            Generate Your Personalized Roadmap
          </h2>

          <p className="text-[#5C4435] mt-4 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            Enter any skill, technology, or career goal you want to learn and
            PathMind will generate a step-by-step AI-powered roadmap designed
            just for you.
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-white rounded-[30px] shadow-lg border border-[#E2C9A0] p-6 sm:p-8 md:p-10">

          <form
            onSubmit={handleGenerate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Skill */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#5C4435] mb-2">
                Skill / Goal
              </label>
              <input
                type="text"
                name="skill"
                placeholder="Example: React Development"
                value={formData.skill}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl dark:text-black border border-[#D8C3A5] bg-[#F9F5EF] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-semibold text-[#5C4435] mb-2">
                Current Skill Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl  dark:text-black border border-[#D8C3A5] bg-[#F9F5EF] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]"
              >
                <option value="">Select Level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-[#5C4435] mb-2">
                Learning Duration
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl border dark:text-black border-[#D8C3A5] bg-[#F9F5EF] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]"
              >
                <option value="">Select Duration</option>
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
              </select>
            </div>

            {/* Goal */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#5C4435] mb-2">
                Career Goal (Optional)
              </label>
              <input
                type="text"
                name="goal"
                placeholder="Example: Get Internship"
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl border dark:text-black border-[#D8C3A5] bg-[#F9F5EF] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]"
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#C49A6C] text-[#1F1B18] font-bold text-lg hover:bg-[#D8B48A] transition-all"
              >
                {loading ? "Generating..." : "Generate Roadmap"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}