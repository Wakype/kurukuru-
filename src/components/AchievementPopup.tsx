"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import hertaIcon from "../assets/images/kururin.gif";

interface Achievement {
  id: string;
  threshold: number;
  title: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    id: "a1",
    threshold: 10,
    title: "Herta Enthusiast",
    description: "Squished 10 times. A good start!",
  },
  {
    id: "a2",
    threshold: 50,
    title: "Kuru Kuru Appreciator",
    description: "Reached 50 squishes. Excellent work.",
  },
  {
    id: "a3",
    threshold: 100,
    title: "Genius Society Member",
    description: "100 squishes! You're officially a genius.",
  },
  {
    id: "a4",
    threshold: 500,
    title: "Peerless Gem",
    description: "500 squishes. Such dedication.",
  },
  {
    id: "a5",
    threshold: 1000,
    title: "Unrivaled Legend",
    description: "1000 squishes. Unbelievable!",
  },
];

export default function AchievementPopup({ count }: { count: number }) {
  const [activeNotification, setActiveNotification] =
    useState<Achievement | null>(null);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load unlocked from local storage
    const saved = localStorage.getItem("hertaAchievements");
    if (saved) {
      setUnlocked(new Set(JSON.parse(saved)));
    }

    // Listen for manual reset
    const handleReset = () => {
      setUnlocked(new Set());
      setActiveNotification(null);
    };
    globalThis.addEventListener("reset-achievements", handleReset);
    return () =>
      globalThis.removeEventListener("reset-achievements", handleReset);
  }, []);

  useEffect(() => {
    const justUnlocked = achievements.find((a) => a.threshold === count);
    if (justUnlocked && !unlocked.has(justUnlocked.id)) {
      // Trigger notification
      setActiveNotification(justUnlocked);

      const newUnlocked = new Set(unlocked);
      newUnlocked.add(justUnlocked.id);
      setUnlocked(newUnlocked);
      localStorage.setItem(
        "hertaAchievements",
        JSON.stringify(Array.from(newUnlocked)),
      );

      // Hide after 5 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 5000);

      // Play a little achievement sound if desired, or let it just be visual
      const audio = new Audio("/sounds/kurukuru.mp3"); // Using existing sound for now
      audio.volume = 0.5;
      audio.play().catch((e) => console.log(e));
    }
  }, [count, unlocked]);

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[200] transition-all duration-500 transform ${
        activeNotification
          ? "translate-x-0 opacity-100"
          : "translate-x-[120%] opacity-0"
      }`}
    >
      {activeNotification && (
        <div className="bg-[#1a1c22] border border-[#2a2d36] shadow-2xl rounded-sm w-[300px] sm:w-[350px] p-4 flex gap-4 items-center">
          <div className="w-12 h-12 bg-[#2d323b] p-1 rounded-sm border border-[#404552] shrink-0">
            <Image
              src={hertaIcon}
              alt="Herta Achievement"
              className="w-full h-full object-cover rounded-sm"
              unoptimized
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h4 className="text-[#a4c5e3] text-xs font-bold uppercase tracking-wider mb-1">
              Achievement Unlocked
            </h4>
            <h3 className="text-white text-sm font-semibold mb-1">
              {activeNotification.title}
            </h3>
            <p className="text-[#7f8694] text-xs">
              {activeNotification.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
