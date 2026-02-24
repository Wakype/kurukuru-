"use client";

import Image from "next/image";
import kururin from "../assets/images/kururin.gif";
import herta from "../assets/images/herta.gif";
import hsrBg from "../assets/images/hertaspace.png";
import { useState, useEffect } from "react";
import SocialLinks from "../components/SocialLinks";
import InfoIcons from "../components/InfoIcons";
import UpdateLogModal from "../components/UpdateLogModal";
import AboutModal from "../components/AboutModal";
import { Button } from "@/components/ui/button";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import AchievementPopup from "../components/AchievementPopup";
import CursorTrail from "../components/CursorTrail";

const kurukuruSound = "/sounds/kurukuru.mp3";
const kururingSound = "/sounds/kururing.mp3";
const bgmFile = "/sounds/kurukuru-bgm.mp3";
const soundFiles = [kurukuruSound, kururingSound];

export default function Home() {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [images, setImages] = useState<
    {
      id: string;
      duration: number;
      top: number;
      left: number;
      xEnd: number;
      yEnd: number;
    }[]
  >([]);
  const [isOpenModal1, setIsOpenModal1] = useState<boolean>(false);
  const [isOpenModal2, setIsOpenModal2] = useState<boolean>(false);
  const [squish, setSquish] = useState<boolean>(false);
  const [combo, setCombo] = useState<number>(0);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [showCombo, setShowCombo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [bgmAudio, setBgmAudio] = useState<HTMLAudioElement | null>(null);

  // Parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onOpenModal1 = () => setIsOpenModal1(true);
  const onCloseModal1 = () => setIsOpenModal1(false);

  const onOpenModal2 = () => setIsOpenModal2(true);
  const onCloseModal2 = () => setIsOpenModal2(false);

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    const soundToPlay = soundFiles[randomIndex];
    const audio = new Audio(soundToPlay);
    audio.play().catch((e) => console.log(e));
  };

  const handleClick = () => {
    setIsClick(true);

    // Combo Logic
    const now = Date.now();
    if (now - lastClickTime < 600) {
      setCombo((prev) => prev + 1);
      setShowCombo(true);
    } else {
      setCombo(1);
      setShowCombo(false);
    }
    setLastClickTime(now);
    setCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("hertaSquishCount", newCount.toString());
      return newCount;
    });
    playRandomSound();

    // Trigger squish animation
    setSquish(true);
    setTimeout(() => setSquish(false), 300);

    const imageId = Math.random().toString(36).substr(2, 9);
    const randomDuration = Math.random() * 2 + 2; // 2s to 4s duration

    setImages((prevImages) => [
      ...prevImages,
      {
        id: imageId,
        duration: randomDuration,
        top: Math.random() * 80 + 10, // Avoid edge 10% on top/bottom
        left: Math.random() * 80 + 10, // Avoid edge 10% on left/right
        xEnd: (Math.random() - 0.5) * 100, // Travel -50vw to 50vw
        yEnd: (Math.random() - 0.5) * 100, // Travel -50vh to 50vh
      },
    ]);

    // Use the random duration for the removal timeout
    setTimeout(() => {
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
    }, randomDuration * 1000);
  };

  const handleReset = () => {
    setCount(0);
    setCombo(0);
    setIsClick(false);
    setShowCombo(false);
    localStorage.removeItem("hertaSquishCount");
    localStorage.removeItem("hertaAchievements"); // Reset achievements globally
    globalThis.dispatchEvent(new Event("reset-achievements"));
  };

  useEffect(() => {
    if (showCombo || combo > 0) {
      const timer = setTimeout(() => setShowCombo(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [combo, showCombo]);

  useEffect(() => {
    // Setup BGM
    const bgm = new Audio(bgmFile);
    bgm.loop = true;
    bgm.volume = 0.1; // low volume
    setBgmAudio(bgm);

    // Attempt autoplay
    bgm.play().catch((e) => {
      console.log("Autoplay prevented:", e);
      setIsMuted(true);
    });

    const savedCount = localStorage.getItem("hertaSquishCount");
    if (savedCount) {
      const parsed = Number.parseInt(savedCount, 10);
      if (parsed > 0) {
        setCount(parsed);
        setIsClick(true);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen (normalized from -1 to 1)
      const x = (e.clientX / globalThis.innerWidth - 0.5) * 2;
      const y = (e.clientY / globalThis.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    globalThis.addEventListener("mousemove", handleMouseMove);
    onOpenModal1();

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
      if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
      }
    };
  }, []);

  const toggleMute = () => {
    if (!bgmAudio) return;

    if (isMuted) {
      bgmAudio.play().catch((e) => console.log("Audio play failed:", e));
      setIsMuted(false);
    } else {
      bgmAudio.pause();
      setIsMuted(true);
    }
  };

  return (
    <div className="w-full min-h-dvh xl:h-dvh bg-space-dark flex flex-col xl:flex-row relative overflow-hidden text-white font-sans selection:bg-fuchsia-500/30">
      {/* Background Layer with Parallax */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out scale-110"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(1.15)`,
        }}
      >
        <Image
          src={hsrBg}
          alt="Space Background"
          fill
          className="object-cover opacity-60 mix-blend-screen select-none"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-[#050b14]/80"></div>
      </div>

      <div className="absolute inset-0 grid-overlay pointer-events-none z-0"></div>

      <UpdateLogModal isOpen={isOpenModal1} onClose={onCloseModal1} />
      <AboutModal isOpen={isOpenModal2} onClose={onCloseModal2} />
      <AchievementPopup count={count} />
      <CursorTrail />

      {/* Bottom Right BGM Toggle */}
      <div className="fixed bottom-6 right-6 xl:bottom-10 xl:right-10 z-[200]">
        <Button
          onClick={toggleMute}
          className="rounded-full w-12 h-12 bg-[#050b14]/60 backdrop-blur-md border border-hud-fuchsia/40 text-fuchsia-200 hover:bg-hud-fuchsia/20 hover:text-white hover:border-hud-fuchsia hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all duration-300"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
      </div>

      {/* Decorative Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-0"></div>
      <div className="absolute top-0 left-0 w-full h-[10%] bg-gradient-to-b from-[rgba(217,70,239,0.05)] to-transparent animate-scanline pointer-events-none z-0"></div>

      {/* Top Navigation - Adjusted for HUD style */}
      <div className="absolute top-0 right-0 p-4 xl:p-8 flex justify-end items-start z-50 pointer-events-none w-full">
        <div className="flex gap-4 pointer-events-auto">
          <SocialLinks />
          <InfoIcons onOpenModal1={onOpenModal1} onOpenModal2={onOpenModal2} />
        </div>
      </div>

      {/* Left/Bottom HUD Panel */}
      <div className="w-full xl:w-[450px] h-auto xl:h-full hud-panel flex flex-col justify-between p-6 xl:p-10 z-40 shrink-0">
        <div>
          <div className="w-12 h-1 bg-hud-fuchsia mb-8 shadow-[0_0_10px_#d946ef]"></div>
          <h1 className="outfit-font text-3xl xl:text-5xl font-bold mb-4 tracking-tight leading-tight hud-text uppercase">
            Herta <br />
            <span className="text-hud-fuchsia font-light">Space Station_</span>
          </h1>
          <p className="text-sm xl:text-base text-fuchsia-100/70 font-mono border-l-2 border-hud-purple pl-4">
            Madam herta is a peerless gem
          </p>
          <p className="text-sm xl:text-base text-fuchsia-100/70 font-mono border-l-2 border-hud-purple pl-4">
            Madam herta is an unrivaled genius
          </p>
          <p className="text-sm xl:text-base text-fuchsia-100/70 font-mono mb-10 border-l-2 border-hud-purple pl-4">
            Madam herta is an inimitable beauty
          </p>

          <div className="hud-panel-alt p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 border-t-2 border-r-2 border-hud-fuchsia w-4 h-4"></div>
            <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-hud-fuchsia w-4 h-4"></div>
            <p className="tracking-[0.3em] text-[10px] text-fuchsia-300/80 uppercase font-bold mb-2">
              Telemetry // Squish_Count
            </p>
            <div className="outfit-font text-6xl font-black hud-text tracking-wider">
              {isClick ? count : "00"}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full mt-4">
          <div className="flex gap-2 w-full">
            <Button
              onClick={handleClick}
              className="outfit-font font-bold hud-button py-6 flex-1 text-lg cursor-pointer"
            >
              SQUISH HERTA
            </Button>
            <Button
              onClick={handleReset}
              title="Reset Count"
              className="hud-button py-6 px-5 cursor-pointer flex items-center justify-center shrink-0"
            >
              <RotateCcw size={20} />
            </Button>
          </div>

          <div className="text-center font-mono opacity-60 flex flex-col items-center gap-1">
            <p className="text-[10px] text-hud-fuchsia lowercase tracking-wider animate-pulse">
              * hint: you can click the herta image to squish too!
            </p>
            <div className="text-[10px] text-fuchsia-200/40 uppercase tracking-widest mt-2 border-t border-hud-purple/20 pt-2 mx-auto">
              SYS_ID: HERTA_67 // V 1.2
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center  xl:min-h-0 z-30">
        {showCombo && combo > 1 && (
          <div
            key={combo}
            className="absolute top-[5%] xl:top-[15%] left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in zoom-in spin-in-3 duration-200 p-4"
          >
            <h2
              className="outfit-font text-5xl xl:text-7xl font-black text-white italic tracking-wider"
              style={{ textShadow: "0 0 20px #d946ef, 0 0 40px #d946ef" }}
            >
              {combo}x COMBO!
            </h2>
          </div>
        )}
        <div
          className={`relative group cursor-pointer transition-transform ${squish ? "squish-effect" : ""}`}
          onClick={handleClick}
        >
          {/* Circular HUD target brackets behind Herta */}
          <div className="absolute inset-0 rounded-full border border-hud-fuchsia/20 animate-pulse-hud group-hover:border-hud-fuchsia/50 transition-all duration-500 scale-125 pointer-events-none border-dashed"></div>
          <div className="absolute inset-0 rounded-full border border-hud-purple/30 group-hover:border-hud-purple/60 transition-all duration-500 scale-150 pointer-events-none blur-sm"></div>

          <Image
            alt="kururing Herta"
            src={kururin}
            className="relative rounded-full pointer-events-none select-none drop-shadow-[0_0_20px_rgba(217,70,239,0.4)] group-hover:drop-shadow-[0_0_40px_rgba(176,38,255,0.6)] [animation:pulse-hud_3s_infinite] transition-all duration-500 z-10 w-48 sm:w-64 xl:w-80"
            priority
          />
        </div>
      </div>

      {images.map((image) => (
        <Image
          unoptimized
          key={image.id}
          src={herta}
          alt="Herta Flying"
          width={280}
          height={280}
          className="absolute herta-fly pointer-events-none select-none drop-shadow-[0_0_30px_rgba(139,92,246,0.4)] mix-blend-screen opacity-90 -ml-[140px] -mt-[140px]"
          style={
            {
              top: `${image.top}vh`,
              left: `${image.left}vw`,
              "--x-end": `${image.xEnd}vw`,
              "--y-end": `${image.yEnd}vh`,
              animationDuration: `${image.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
