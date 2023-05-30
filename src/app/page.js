'use client';

import Image from 'next/image';
import kururin from '../assets/images/kururin.gif';
import herta from '../assets/images/herta.gif';
import kurukuruSound from '../assets/sound/kurukuru.mp3';
import kururingSound from '../assets/sound/kururing.mp3';
import { useState, useEffect } from 'react';
import { AiFillGithub, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import { FaTiktok, FaInfoCircle } from 'react-icons/fa';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  UnorderedList,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';
import { BiNews } from 'react-icons/bi';

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

  const info = [
    { icon: <BiNews size={20} />, onClick: onOpenModal1 },
    { icon: <FaInfoCircle size={20} />, onClick: onOpenModal2 },
  ];
  const social = [
    { icon: <AiFillGithub size={20} />, link: 'https://github.com/Wakype' },
    {
      icon: <AiFillInstagram size={20} />,
      link: 'https://www.instagram.com/im.waky/',
    },
    {
      icon: <AiFillYoutube size={20} />,
      link: 'https://www.youtube.com/channel/UC7JSaEVgUPKkirPf3fKmKrg',
    },
    { icon: <FaTiktok size={20} />, link: 'https://www.tiktok.com/@im.wakype' },
  ];

  function openNewTab(url) {
    window.open(url, '_blank');
  }

  const play = () => {
    setIsClick(true);
    setCount(count + 1);

    const soundFiles = [kurukuruSound, kururingSound];
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    const audio = new Audio(soundFiles[randomIndex]);

    const newImage = (
      <Image
        key={Date.now()} // Menambahkan key unik untuk setiap gambar
        src={herta} // Ganti dengan path gambar yang diinginkan
        alt="Sliding Image"
        width={300}
        className={`absolute`}
      />
    );

    setImages((prevImages) => [...prevImages, newImage]);

    // setTimeout(() => {
    //   setImages((prevImages) => prevImages.filter((img) => img !== newImage));
    // }, 4000); // Delay sebelum menghapus gambar dalam milidetik

    return audio.play();
  };

  useEffect(() => {
    onOpenModal1();
  }, []);
  return (
    <div className="w-screen h-screen bg-[#51308d] flex flex-col justify-between relative">
      <Modal onClose={onCloseModal1} isOpen={isOpenModal1} isCentered>
        <ModalOverlay />
        <ModalContent className="bg-[#833bdb]">
          <ModalHeader>UPDATE LOG</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              <ListItem className="font-bold text-[20px]">v1.0</ListItem>
              <OrderedList>
                <ListItem>
                  Web still on development (will be another update incoming 🤔)
                </ListItem>
                <ListItem>
                  If spam the squish button the herta will broken, the function
                  its kinda buggy (ill fix it soon 👀)
                </ListItem>
                <ListItem>Soon ill add country and leaderboard 😎</ListItem>
              </OrderedList>
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="facebook" onClick={onCloseModal1}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onCloseModal2} isOpen={isOpenModal2} isCentered>
        <ModalOverlay />
        <ModalContent className="bg-[#833bdb]">
          <ModalHeader>ABOUT THIS WEB</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <p>this web just for waste my time, idk why, but i like it lmao</p>
          <p>Herta is character from Honkai Star Rail</p>
          </ModalBody>
          <ModalFooter>
            <p className="text-left mr-10">All rights® are belong to HOYOVERSE</p>
            <Button colorScheme="facebook" onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="mix-blend-multiply">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
          <path
            fill="#d49fd3"
            fillOpacity={1}
            d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,112C1120,128,1280,128,1360,128L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center relative z-50">
        <section className="absolute right-5 top-[150px] flex flex-col justify-center space-y-3">
          {social.map((_, i) => {
            return (
              <div
                key={i}
                className="rounded-lg p-2 glass cursor-pointer"
                onClick={() => openNewTab(_.link)}
              >
                {_.icon}
              </div>
            );
          })}
        </section>
        <section className="absolute left-5 top-[180px] flex flex-col justify-center space-y-3">
          {info.map((_, i) => {
            return (
              <div
                key={i}
                className="rounded-lg p-2 glass cursor-pointer"
                onClick={_.onClick}
              >
                {_.icon}
              </div>
            );
          })}
        </section>

        <div className="flex flex-col items-center mb-10">
          <h1 className="text-[40px]">
            Greetings{' '}
            <span className="underline h1 underline-offset-4 italic">
              trailblazer
            </span>{' '}
            !!!
          </h1>
          <p className="text-[20px]">
            Dive into the world of Herta, the irresistibly cute and
            exceptionally gifted character from Honkai: Star Rail.
          </p>
        </div>
        <div className="flex items-center space-x-10">
          <button
            onClick={play}
            className="h1 rounded-lg bg-[#833bdb] py-3 w-[60%] hover:shadow-xl shadow-[#833bdb] hover:bg-[#411f73] hover:-translate-y-1"
          >
            ... squish herta ...
          </button>
          <Image
            alt="kururing"
            src={kururin}
            className="rounded-lg shadow-[#833bdb]"
            width={300}
          ></Image>
          <button
            onClick={play}
            className="h1 rounded-lg bg-[#833bdb] py-3 w-[60%] hover:shadow-xl shadow-[#833bdb] hover:bg-[#411f73] hover:-translate-y-1"
          >
            ... squish herta ...
          </button>
        </div>
        <div className="flex flex-col items-center mt-12">
          {isClick ? (
            <h1 className="text-[35px]">{count}</h1>
          ) : (
            <h1 className="text-[35px]">?</h1>
          )}
          <p className="text-[20px]">Time(s) Squished</p>
        </div>

        <div className="absolute"></div>
      </div>

      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
          <path
            fill="#833bdb"
            fillOpacity={1}
            d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,112C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        <div className="absolute bottom-3 h1 w-full flex justify-center z-50">
          <p className="h1 text-[13px]">Proudly made in 🇮🇩 by Wakype</p>
        </div>
      </div>

      <section className="bg-transparent absolute z-0 right-0 bottom-0">
        <div className="w-[300px] h-[300px]">
          {images.map((image, i) => {
            setTimeout(() => {
              // setImages((prevImages) => prevImages.slice(1));
              setImages((prevImages) =>
                prevImages.filter((img) => img !== image)
              );
            }, 5000); // Delay sebelum menghapus gambar dalam milidetik

            return (
              <div key={i} className="slide-from-right">
                {image}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
