// server/models/Roadmap.js

const mongoose = require("mongoose");

const checklistItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    goal: {
      type: String,
      default: "",
    },

    roadmap: {
      type: String,
      required: true,
    },

    checklist: {
      type: [checklistItemSchema],
      default: [],
    },

    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);