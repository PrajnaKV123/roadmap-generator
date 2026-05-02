"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/header";
import DashboardBanner from "@/components/DashboardBanner";
import FeaturedRoadmaps from "@/components/FeaturedRoadmaps";
import RoadmapGenerator from "@/components/RoadmapGenerator";
import Footer from "@/components/Footer";
import DashboardAnalytics from "@/components/DashboardAnalytics";

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const { _id: userId } = JSON.parse(storedUser);

    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/roadmap/user/${userId}`
        );
        setRoadmaps(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, [router]);

  return (
    <div className="bg-[#F5EFE6] min-h-screen">
      <Header />
      <DashboardBanner />
       <FeaturedRoadmaps />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <DashboardAnalytics roadmaps={roadmaps} loading={loading} />
        <RoadmapGenerator />
      </main>
      <Footer />
    </div>
  );
}
