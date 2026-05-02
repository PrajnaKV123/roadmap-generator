"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DashboardAnalytics({ roadmaps, loading }) {
  const statusRef = useRef(null);
  const distributionRef = useRef(null);
  const comparisonRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const total = roadmaps.length;
    const completedCount = roadmaps.filter((roadmap) => roadmap.progress === 100)
      .length;
    const inProgressCount = total - completedCount;
    const averageProgress = total
      ? Math.round(
          roadmaps.reduce((sum, roadmap) => sum + (roadmap.progress || 0), 0) /
            total
        )
      : 0;

    const rangeCounts = [0, 0, 0, 0, 0];
    roadmaps.forEach((roadmap) => {
      const progress = roadmap.progress || 0;
      if (progress === 100) {
        rangeCounts[4] += 1;
      } else if (progress >= 75) {
        rangeCounts[3] += 1;
      } else if (progress >= 50) {
        rangeCounts[2] += 1;
      } else if (progress >= 25) {
        rangeCounts[1] += 1;
      } else {
        rangeCounts[0] += 1;
      }
    });

    const charts = [];

    if (statusRef.current) {
      charts.push(
        new Chart(statusRef.current, {
          type: "doughnut",
          data: {
            labels: ["Completed", "In Progress"],
            datasets: [
              {
                data: [completedCount, inProgressCount],
                backgroundColor: ["#C49A6C", "#75511a"],
                borderColor: ["#F9EFE6", "#F9EFE6"],
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#2C1810",
                },
              },
            },
          },
        })
      );
    }

    if (distributionRef.current) {
      charts.push(
        new Chart(distributionRef.current, {
          type: "bar",
          data: {
            labels: ["0-24%", "25-49%", "50-74%", "75-99%", "100%"],
            datasets: [
              {
                label: "Roadmaps",
                data: rangeCounts,
                backgroundColor: [
                  "#D7B99C",
                  "#C49A6C",
                  "#B08556",
                  "#8C4A36",
                  "#5F2E11",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: { color: "#2C1810" },
              },
              y: {
                beginAtZero: true,
                ticks: { color: "#2C1810", precision: 0 },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        })
      );
    }

    if (comparisonRef.current) {
      charts.push(
        new Chart(comparisonRef.current, {
          type: "bar",
          data: {
            labels: roadmaps.map((roadmap) =>
              `${roadmap.skill || "Roadmap"}`.slice(0, 18)
            ),
            datasets: [
              {
                label: "Progress %",
                data: roadmaps.map((roadmap) => roadmap.progress || 0),
                backgroundColor: roadmaps.map(() => "#8C4A36"),
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: { color: "#2C1810" },
              },
              y: {
                beginAtZero: true,
                max: 100,
                ticks: { color: "#2C1810", stepSize: 20 },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        })
      );
    }

    return () => charts.forEach((chart) => chart.destroy());
  }, [roadmaps, loading]);

  const total = roadmaps.length;
  const completedCount = roadmaps.filter((roadmap) => roadmap.progress === 100)
    .length;
  const inProgressCount = total - completedCount;
  const averageProgress = total
    ? Math.round(
        roadmaps.reduce((sum, roadmap) => sum + (roadmap.progress || 0), 0) /
          total
      )
    : 0;

  return (
    <section className="bg-white border border-[#E2C9A0] rounded-[32px] shadow-lg p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8B6F60]">
            Progress Analytics
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#632709] mt-2">
            Roadmap Performance
          </h2>
        </div>
        <p className="text-sm text-[#5C4435] max-w-xl leading-relaxed">
          Track learning progress across all your saved roadmaps with live
          checklist completion, completion status, and visual analytics.
        </p>
      </div>

      <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
        <div className="rounded-3xl border border-[#E2C9A0] bg-[#FDF6EE] p-4 sm:p-5 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B6F60]">
            Total Roadmaps
          </p>
          <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-[#632709]">{total}</p>
        </div>

        <div className="rounded-3xl border border-[#E2C9A0] bg-[#FDF6EE] p-4 sm:p-5 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B6F60]">
            Completed
          </p>
          <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-[#632709]">{completedCount}</p>
        </div>

        <div className="rounded-3xl border border-[#E2C9A0] bg-[#FDF6EE] p-4 sm:p-5 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B6F60]">
            In Progress
          </p>
          <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-[#632709]">{inProgressCount}</p>
        </div>

        <div className="rounded-3xl border border-[#E2C9A0] bg-[#FDF6EE] p-4 sm:p-5 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B6F60]">
            Avg Progress
          </p>
          <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-bold text-[#632709]">{averageProgress}%</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-[#E2C9A0] bg-[#F7EFE4] p-4 sm:p-5 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-[#5C4435] mb-3">
            Completed vs In Progress
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <canvas ref={statusRef} />
          </div>
        </div>

        <div className="rounded-3xl border border-[#E2C9A0] bg-[#F7EFE4] p-4 sm:p-5 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-[#5C4435] mb-3">
            Progress Distribution
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <canvas ref={distributionRef} />
          </div>
        </div>

        <div className="rounded-3xl border border-[#E2C9A0] bg-[#F7EFE4] p-4 sm:p-5 shadow-sm md:col-span-2 xl:col-span-1">
          <h3 className="text-base sm:text-lg font-semibold text-[#5C4435] mb-3">
            Roadmap Comparison
          </h3>
          <div className="h-48 sm:h-56 md:h-64">
            <canvas ref={comparisonRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
