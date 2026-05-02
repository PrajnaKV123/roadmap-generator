"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [interests, setInterests] = useState([]);
  const [input, setInput] = useState("");
  const [roadmaps, setRoadmaps] = useState([]);
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    setBio(parsed.bio || "");
    setInterests(parsed.interests || []);
    if (!parsed.bio) setEditingBio(true);

    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/roadmap/user/${parsed._id}`
        );
        setRoadmaps(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRoadmaps(false);
      }
    };

    fetchRoadmaps();
  }, [router]);

  // Save profile to database
  const saveProfile = async (newBio, newInterests) => {
    if (!user) return;
    setSaving(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/profile/${user._id}`,
        { bio: newBio, interests: newInterests }
      );
      const updatedUser = res.data.user;
      setUser(updatedUser);
      setBio(updatedUser.bio);
      setInterests(updatedUser.interests);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.log(error);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const saveBio = async () => {
    await saveProfile(bio, interests);
    setEditingBio(false);
  };

  const addInterest = async () => {
    if (!input.trim()) return;
    const updated = [...interests, input.trim()];
    setInput("");
    await saveProfile(bio, updated);
  };

  const removeInterest = async (i) => {
    const updated = interests.filter((_, index) => index !== i);
    await saveProfile(bio, updated);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FDF6EE] flex items-center justify-center">
        <p className="text-[#8B6F60] text-lg">Loading...</p>
      </div>
    );
  }

  const completed = roadmaps.filter((r) => r.progress === 100).length;
  const averageProgress = roadmaps.length
    ? Math.round(
        roadmaps.reduce((sum, roadmap) => sum + (roadmap.progress || 0), 0) /
          roadmaps.length
      )
    : 0;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#FDF6EE] text-[#2C1810]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">

          {/* PAGE TITLE */}
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#632709]"
            style={{ fontFamily: "serif" }}
          >
            Your Profile
          </h1>

          {/* ── PROFILE CARD ── */}
          <div className="bg-white border border-[#E2C9A0] rounded-2xl p-6 sm:p-8 flex items-center gap-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C4705A] to-[#8C4A36] flex items-center justify-center text-white text-3xl font-bold shadow-md flex-shrink-0">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2C1810]">
                {user.username}
              </h2>
              <p className="text-sm text-[#8B6F60] mt-1">{user.email}</p>
            </div>
          </div>

          {/* ── STATS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E2C9A0] p-5 rounded-2xl shadow-sm text-center">
              <p className="text-xs uppercase tracking-widest text-[#8B6F60] font-semibold mb-1">
                Total Roadmaps
              </p>
              <h2 className="text-3xl font-bold text-[#632709]">{roadmaps.length}</h2>
            </div>
            <div className="bg-white border border-[#E2C9A0] p-5 rounded-2xl shadow-sm text-center">
              <p className="text-xs uppercase tracking-widest text-[#8B6F60] font-semibold mb-1">
                Completed
              </p>
              <h2 className="text-3xl font-bold text-[#632709]">{completed}</h2>
            </div>
            <div className="bg-white border border-[#E2C9A0] p-5 rounded-2xl shadow-sm text-center">
              <p className="text-xs uppercase tracking-widest text-[#8B6F60] font-semibold mb-1">
                In Progress
              </p>
              <h2 className="text-3xl font-bold text-[#632709]">
                {roadmaps.length - completed}
              </h2>
            </div>
            <div className="bg-white border border-[#E2C9A0] p-5 rounded-2xl shadow-sm text-center">
              <p className="text-xs uppercase tracking-widest text-[#8B6F60] font-semibold mb-1">
                Avg Progress
              </p>
              <h2 className="text-3xl font-bold text-[#632709]">{averageProgress}%</h2>
            </div>
          </div>

          {/* ── BIO ── */}
          <div className="bg-white border border-[#E2C9A0] p-6 sm:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#2C1810]">About Me</h3>
              {!editingBio && bio && (
                <button
                  onClick={() => setEditingBio(true)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#C4705A] hover:text-[#8C4A36] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
              )}
            </div>

            {editingBio ? (
              <div>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full p-4 border border-[#D8C3A5] rounded-xl bg-[#FDF6EE] text-[#2C1810] placeholder-[#8B6F60] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about yourself, your goals, and what you're passionate about..."
                />
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={saveBio}
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-[#C4705A] text-white font-semibold text-sm hover:bg-[#8C4A36] transition-colors shadow-sm disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  {user.bio && (
                    <button
                      onClick={() => {
                        setBio(user.bio || "");
                        setEditingBio(false);
                      }}
                      className="px-6 py-2.5 rounded-xl border border-[#D8C3A5] text-[#5C4435] font-semibold text-sm hover:bg-[#F5EFE6] transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ) : bio ? (
              <p className="text-[#5C4435] leading-relaxed whitespace-pre-wrap">
                {bio}
              </p>
            ) : null}
          </div>

          {/* ── YOUR INTERESTS (display) ── */}
          {interests.length > 0 && (
            <div className="bg-white border border-[#E2C9A0] p-6 sm:p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-[#2C1810] mb-4">
                Your Interests
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F5EAD9] to-[#FDF6EE] border border-[#E2C9A0] rounded-full text-sm font-medium text-[#5C4435]"
                  >
                    {item}
                    <button
                      onClick={() => removeInterest(i)}
                      disabled={saving}
                      className="text-[#C4705A] hover:text-red-600 transition-colors text-xs font-bold leading-none disabled:opacity-50"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── ADD INTEREST (input) ── */}
          <div className="bg-white border border-[#E2C9A0] p-6 sm:p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-[#2C1810] mb-4">
              Add New Interest
            </h3>
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addInterest()}
                placeholder="e.g. Machine Learning, React, UI Design..."
                className="flex-1 px-4 py-3 border border-[#D8C3A5] rounded-xl bg-[#FDF6EE] text-[#2C1810] placeholder-[#8B6F60] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent transition-all text-sm"
              />
              <button
                onClick={addInterest}
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-[#C4705A] text-white font-semibold text-sm hover:bg-[#8C4A36] transition-colors shadow-sm flex-shrink-0 disabled:opacity-50"
              >
                {saving ? "..." : "+ Add"}
              </button>
            </div>
          </div>

          {/* ── ROADMAP LIST ── */}
          <div className="bg-white border border-[#E2C9A0] p-6 sm:p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-[#2C1810] mb-4">
              Your Roadmaps
            </h3>

            <div className="space-y-3">
              {loadingRoadmaps ? (
                <p className="text-[#8B6F60]">Loading roadmaps...</p>
              ) : roadmaps.length > 0 ? (
                roadmaps.map((r) => (
                  <div
                    key={r._id}
                    className="p-4 border border-[#E2C9A0] rounded-xl hover:shadow-md hover:border-[#C49A6C] transition-all group"
                  >
                    <p className="font-semibold text-[#2C1810] group-hover:text-[#632709] transition-colors">
                      {r.skill}
                    </p>
                    <p className="text-sm text-[#8B6F60] mt-1">
                      {r.level} • {r.duration}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-[#8B6F60]">
                    No roadmaps yet. Generate your first one from the Dashboard!
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}