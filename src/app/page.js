"use client";

import Image from "next/image";
import kururin from "../assets/images/kururin.gif";
import herta from "../assets/images/herta.gif";
import kurukuruSound from "../assets/sounds/kurukuru.mp3";
import kururingSound from "../assets/sounds/kururing.mp3";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SocialLinks from "../components/SocialLinks";
import InfoIcons from "../components/InfoIcons";
import UpdateLogModal from "../components/UpdateLogModal";
import AboutModal from "../components/AboutModal";

const soundFiles = [kurukuruSound, kururingSound];

export default function Home() {
  const [isClick, setIsClick] = useState(false);
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();

  const playRandomSound = () => {
    const randomSound = new Audio(
      soundFiles[Math.floor(Math.random() * soundFiles.length)]
    );
    randomSound.play();
  };

  const handleClick = () => {
    setIsClick(true);
    setCount(count + 1);
    playRandomSound();

    const imageId = Date.now();
    const randomDuration = Math.random() * 4 + 3; // Duration between 3 and 7 seconds

    setImages((prevImages) => [
      ...prevImages,
      { id: imageId, duration: randomDuration },
    ]);

    // Use the random duration for the removal timeout
    setTimeout(() => {
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
    }, randomDuration * 1000);
  };

  useEffect(() => {
    onOpenModal1();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#51308d] flex flex-col justify-between relative overflow-hidden">
      <UpdateLogModal isOpen={isOpenModal1} onClose={onCloseModal1} />
      <AboutModal isOpen={isOpenModal2} onClose={onCloseModal2} />

      <div className="flex z-[99] mt-5 xl:mt-0 absolute xl:h-full xl:left-5 justify-center xl:justify-normal w-full xl:w-auto xl:items-center">
        <SocialLinks />
      </div>
      <div className="flex z-[99] mt-16 xl:mt-0 absolute xl:h-full xl:right-5 justify-center xl:justify-normal w-full xl:w-auto 5xl: items-center">
        <InfoIcons onOpenModal1={onOpenModal1} onOpenModal2={onOpenModal2} />
      </div>

      <div className="mix-blend-multiply">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 150"
          className="hidden xl:block"
        >
          <path
            fill="#d49fd3"
            fillOpacity={1}
            d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,112C1120,128,1280,128,1360,128L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center relative z-50">
        <div className="flex flex-col items-center mb-10">
          <h1 className="xl:text-3xl text-xl text-center">
            Greetings{" "}
            <span className="underline h1 underline-offset-4 italic">
              trailblazer
            </span>{" "}
            !!!
          </h1>
          <p className="xl:text-base text-xs text-center mt-3 px-5">
            Dive into the world of Herta, the irresistibly cute and
            exceptionally gifted character from Honkai: Star Rail.
          </p>
        </div>

        <div className="flex items-center xl:space-x-10">
          <button
            onClick={handleClick}
            className="h1 xl:block hidden rounded-lg bg-[#833bdb] py-2 w-[50%] hover:shadow-xl shadow-[#833bdb] hover:bg-[#411f73] hover:-translate-y-1"
          >
            ... squish herta ...
          </button>
          <Image
            alt="kururing"
            src={kururin}
            className="rounded-lg shadow-[#833bdb]"
            width={300}
          />
          <button
            onClick={handleClick}
            className="h1 xl:block hidden rounded-lg bg-[#833bdb] py-2 w-[50%] hover:shadow-xl shadow-[#833bdb] hover:bg-[#411f73] hover:-translate-y-1"
          >
            ... squish herta ...
          </button>
        </div>

        <div className="flex flex-col items-center mt-12">
          <h1 className="text-[35px]">{isClick ? count : "?"}</h1>
          <p className="xl:text-xl text-base">Time(s) Squished</p>
        </div>

        <button
          onClick={handleClick}
          className="h1 mt-5 block xl:hidden rounded-lg bg-[#833bdb] py-2 w-[50%] hover:shadow-xl shadow-[#833bdb] hover:bg-[#411f73] hover:-translate-y-1"
        >
          ... squish herta ...
        </button>
      </div>

      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 150"
          className="hidden xl:block"
        >
          <path
            fill="#833bdb"
            fillOpacity={1}
            d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,112C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
        <div className="absolute bottom-3 h1 w-full flex justify-center z-50">
          <p className="h1 text-[13px]">Made in 🇮🇩 by Wakype</p>
        </div>
      </div>
      {images.map((image) => (
        <Image
          key={image.id}
          src={herta}
          alt="Herta Transparent"
          width={300}
          height={300}
          className="absolute herta-slide animate-spin"
          style={{ animationDuration: `${image.duration}s` }}
        />
      ))}
    </div>
  );
}
