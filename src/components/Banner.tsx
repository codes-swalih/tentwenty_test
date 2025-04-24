"use client"
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./Navbar";
import HeroTitle from "./BannerComponents/Title";
import ProgressBar from "./BannerComponents/ProgressBar";
import SliderImage from "./BannerComponents/SliderImage";
import ImageCounter from "./BannerComponents/ImageCounter";
import { bannerImages } from "../assets/assets";

// Constants
const IMAGE_UPDATE_INTERVAL = 5000;
const PROGRESS_UPDATE_INTERVAL = 50;
const PROGRESS_INCREMENT = (PROGRESS_UPDATE_INTERVAL / IMAGE_UPDATE_INTERVAL) * 100;

function Banner() {
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [sliderImageIndex, setSliderImageIndex] = useState<number>(1);
  const firstRender = useRef<boolean>(true);
  const imageIntervalIdRef = useRef<NodeJS.Timeout>();

  // Initialize first render state
  useEffect(() => {
    firstRender.current = false;
    return () => clearInterval(imageIntervalIdRef.current);
  }, []);

  // Progress bar utility
  const getProgressStyle = useCallback((progress: number, start: number, range: number): string => {
    if (progress === 100 || progress <= start) return "0%";
    if (progress <= start + range) return `${((progress - start) / range) * 100}%`;
    return "100%";
  }, []);

  // Image index display utility
  const getDisplayIndex = useCallback((index: number, length: number): number => {
    return ((index - 1 + length) % length) + 1;
  }, []);

  // Image update handler
  const handleImageUpdate = useCallback(() => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
    setSliderImageIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
    setProgress(0);
  }, []);

  // Next image click handler
  const handleNextClick = useCallback(() => {
    clearInterval(imageIntervalIdRef.current);
    handleImageUpdate();
  }, [handleImageUpdate]);

  // Setup image and progress intervals
  useEffect(() => {
    imageIntervalIdRef.current = setInterval(handleImageUpdate, IMAGE_UPDATE_INTERVAL);

    const progressIntervalId = setInterval(() => {
      setProgress(prevProgress => Math.min(prevProgress + PROGRESS_INCREMENT, 100));
    }, PROGRESS_UPDATE_INTERVAL);

    return () => {
      clearInterval(imageIntervalIdRef.current);
      clearInterval(progressIntervalId);
    };
  }, [handleImageUpdate]);

  // Render progress bar segments


  return (
    <div className="w-full h-[100svh] relative">
      <div className="h-full w-full relative overflow-hidden">
        {[
          { index: currentImageIndex - 1 < 0 ? bannerImages.length - 1 : currentImageIndex - 1, delay: 0 },
          { index: currentImageIndex, delay: 0.2 }
        ].map(({ index, delay }) => (
          <div key={index} className="w-full h-full z-0 absolute top-0 flex items-center">
            <motion.div
              initial={firstRender.current ? { height: "100%" } : { height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay }}
              className="w-full h-full relative"
            >
              <Image
                src={bannerImages[index]}
                alt="Banner image of nature,farms,beaches"
                fill
                className="object-cover"
                priority
                sizes="100vw"
                quality={90}
              />
            </motion.div>
          </div>
        ))}
      </div>

      <section className="w-screen h-full absolute top-0 left-0">
        <Navbar />
        <HeroTitle currImageIndex={currentImageIndex} />

        <div className="absolute z-10 bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-[4rem] left-4 sm:left-[5%] lg:left-[10%]">
          <div className="flex gap-3 sm:gap-6 lg:gap-7 items-center">
            <div className="w-[10rem] sm:w-[7rem] lg:w-[8.8rem] h-[10rem] sm:h-[7rem] lg:h-[8.8rem]">
              <ProgressBar 
                progress={progress}
                getProgressStyle={getProgressStyle}
              />
              
              <div className="flex w-full h-full absolute top-0 left-0">
                <div
                  onClick={handleNextClick}
                  className="flex relative items-center justify-center w-full h-full mx-auto my-auto"
                >
                  <div className="w-32 md:w-[41%] -ml-[225px] md:-ml-[198.5px] sm:-ml-[198.5px] relative my-auto h-32 sm:h-full flex items-center justify-center border-[0.5px] border-gray-500">
                    <div className="relative my-auto w-[68%] h-[68%]">
                      {[
                        { index: sliderImageIndex - 1 < 0 ? bannerImages.length - 1 : sliderImageIndex - 1, initial: true },
                        { index: sliderImageIndex, initial: firstRender.current }
                      ].map(({ index, initial }) => (
                        <SliderImage
                          key={index}
                          index={index}
                          initial={initial}
                          src={bannerImages[index]}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ImageCounter
              currentIndex={getDisplayIndex(sliderImageIndex, bannerImages.length)}
              totalImages={bannerImages.length}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;