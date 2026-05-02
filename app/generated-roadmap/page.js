// app/generated-roadmap/page.js

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function GeneratedRoadmapPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          router.push("/login");
          return;
        }

        const { _id: userId } = JSON.parse(storedUser);

        const res = await axios.get(
          `http://localhost:5000/api/roadmap/user/${userId}`
        );

        setRoadmaps(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, [router]);

  const handleToggle = async (roadmapId, index, checked) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const { _id: userId } = JSON.parse(storedUser);

    try {
      setSavingId(roadmapId);

      const res = await axios.patch(
        `http://localhost:5000/api/roadmap/${roadmapId}/checklist`,
        {
          itemIndex: index,
          completed: checked,
          userId,
        }
      );

      setRoadmaps((prev) =>
        prev.map((roadmap) =>
          roadmap._id === roadmapId ? res.data : roadmap
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to update checklist progress.");
    } finally {
      setSavingId(null);
    }
  };

  // Make roadmap links clickable
  const renderWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        let cleanUrl = part.replace(/[),.]+$/, "");

        if (!cleanUrl.startsWith("http")) {
          cleanUrl = `https://${cleanUrl}`;
        }

        return (
          <a
            key={index}
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C4705A] underline break-all font-medium hover:text-[#A85C3A] transition-colors"
          >
            {part}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div>
      <Header />

      <section className="min-h-screen bg-[#F5EFE6] px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#632709]"
              style={{ fontFamily: "serif" }}
            >
              Your Personalized Roadmaps
            </h1>

            <p className="text-[#5C4435] mt-4 text-lg">
              Manage your learning checklist, track progress, and continue where
              you left off.
            </p>
          </div>

          {/* Roadmaps */}
          <div className="space-y-8">
            {loading ? (
              <div className="bg-white border border-[#E2C9A0] rounded-[28px] shadow-lg p-10">
                <p className="text-center text-[#8B5E3C] text-lg">
                  Loading your roadmaps...
                </p>
              </div>
            ) : roadmaps.length > 0 ? (
              roadmaps.map((item) => {
                const completedItems =
                  item.checklist?.filter((step) => step.completed).length || 0;

                const totalItems = item.checklist?.length || 0;
                const progress = item.progress || 0;

                return (
                  <div
                    key={item._id}
                    className="bg-white border border-[#E2C9A0] rounded-[28px] shadow-lg p-4 sm:p-6 md:p-8 lg:p-10"
                  >
                    {/* Top Section */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                      {/* Left Side */}
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#6f3011] mb-2">
                          {item.skill}
                        </h2>

                        <p className="text-[#8B5E3C] text-sm sm:text-base">
                          {item.level} • {item.duration}
                        </p>

                        {item.goal && (
                          <p className="text-[#5C4435] mt-3">
                            <span className="font-semibold">
                              Career Goal:
                            </span>{" "}
                            {item.goal}
                          </p>
                        )}
                      </div>

                      {/* Progress Box */}
                      <div className="rounded-3xl bg-[#F7EFE4] border border-[#E2C9A0] p-4 shadow-sm w-full sm:w-auto sm:min-w-55 lg:min-w-60">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#8B6F60] mb-3">
                          Progress
                        </p>

                        <div className="bg-[#E6D4BC] h-3 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#C49A6C] transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <p className="text-right text-sm font-semibold text-[#5C4435] mt-3">
                          {progress}% complete
                        </p>

                        <p className="text-xs text-[#8B6F60] mt-2">
                          {completedItems}/{totalItems} completed
                        </p>
                      </div>
                    </div>

                    {/* Middle Section */}
                    <div className="mt-8 space-y-6">

                      {/* Checklist Section */}
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-[#5C4435]">
                            Checklist Actions
                          </h3>

                          {savingId === item._id && (
                            <span className="text-sm text-[#8B6F60]">
                              Saving...
                            </span>
                          )}
                        </div>

                        {item.checklist && item.checklist.length > 0 ? (
                          <div className="space-y-3">
                            {item.checklist.map((step, index) => (
                              <label
                                key={index}
                                className="flex items-start gap-3 rounded-3xl border border-[#E2C9A0] bg-[#FDF6EE] p-3 sm:p-4 hover:bg-[#F9F4ED] transition-colors cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={step.completed}
                                  onChange={(e) =>
                                    handleToggle(
                                      item._id,
                                      index,
                                      e.target.checked
                                    )
                                  }
                                  className="mt-1 h-5 w-5 rounded border-[#C49A6C] text-[#C49A6C] focus:ring-[#C49A6C]"
                                />

                                <span
                                  className={`text-sm sm:text-base leading-6 flex-1 ${
                                    step.completed
                                      ? "text-[#8B5E3C] line-through"
                                      : "text-[#4A3A2F]"
                                  }`}
                                >
                                  {step.text}
                                </span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-3xl border border-[#E2C9A0] bg-[#FDF6EE] p-6 text-[#8B5E3C]">
                            No actionable checklist items available yet.
                          </div>
                        )}
                      </div>

                      {/* Roadmap Details */}
                      <div className="w-full">
                        <div className="rounded-3xl border border-[#E2C9A0] bg-[#FDF6EE] p-6 text-[#4A3A2F] shadow-sm">
                          <h3 className="text-lg font-semibold text-[#5C4435] mb-4">
                            Roadmap Details
                          </h3>

                          <div className="whitespace-pre-wrap text-sm leading-7">
                            {renderWithLinks(item.roadmap)}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white border border-[#E2C9A0] rounded-[28px] shadow-lg p-10">
                <p className="text-center text-[#8B5E3C] text-lg">
                  No roadmap generated yet. Go to Dashboard to create one!
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}