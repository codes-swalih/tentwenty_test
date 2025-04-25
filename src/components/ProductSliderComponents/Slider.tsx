"use client"
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { productsDetails } from "../../assets/assets";
import Image from "next/image";

// Types for props and state
interface DragState {
  isDragging: boolean;
  startX: number;
  endX: number;
}

interface MotionState {
  constants: number[];
  xConstant: number;
  distance: number;
}

const ProductsSlider: React.FC = () => {
  // Animation state with proper typing
  const [motionState, setMotionState] = useState<MotionState>({
    constants: productsDetails.map(
      (_, index) => index - Math.floor(productsDetails.length / 2)
    ),
    xConstant: 0,
    distance: 0
  });

  const [textIndex, setTextIndex] = useState<number>(
    Math.floor(productsDetails.length / 2)
  );
  const [showDragSign, setShowDragSign] = useState<boolean>(true);

  // Screen size state
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  // Add useEffect for client-side window access
  useEffect(() => {
    // Set initial screen width
    setScreenWidth(window.innerWidth);
    
    // Handle resize events
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update large screen state when screen width changes
  useEffect(() => {
    setIsLargeScreen(screenWidth >= 1024);
    if (slidersContainerRef.current) {
      const sliderContainerWidth = slidersContainerRef.current.offsetWidth;
      setMotionState(prev => ({
        ...prev,
        distance: sliderContainerWidth / productsDetails.length
      }));
    }
  }, [screenWidth]);

  // Drag state management
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    endX: 0
  });

  const slidersContainerRef = useRef<HTMLDivElement>(null);

  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLargeScreen(screenWidth >= 1024);
    if (slidersContainerRef.current) {
      const sliderContainerWidth = slidersContainerRef.current.offsetWidth;
      setMotionState(prev => ({
        ...prev,
        distance: sliderContainerWidth / productsDetails.length
      }));
    }
  }, [screenWidth]);

  // Drag handlers with improved type safety
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const currentX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    setDragState(prev => ({ ...prev, isDragging: true, startX: currentX }));
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!dragState.isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    setDragState(prev => ({ ...prev, endX: currentX }));
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!dragState.isDragging) return;

    const { startX, endX } = dragState;
    setDragState(prev => ({ ...prev, isDragging: false }));

    if (endX !== 0) {
      const dragDistance = endX - startX;
      setDragState(prev => ({ ...prev, endX: 0 }));

      if (Math.abs(dragDistance) > 20) {
        setShowDragSign(false);
        updateSliderPosition(dragDistance);
      }
    }
  };

  // Helper function to update slider position
  const updateSliderPosition = (dragDistance: number) => {
    const midIndex = Math.floor(motionState.constants.length / 2);
    
    if (dragDistance > 0) {
      if (motionState.constants[midIndex] !== midIndex) {
        setMotionState(prev => ({
          ...prev,
          constants: prev.constants.map(item => item + 1),
          xConstant: prev.xConstant + 1
        }));
        setTextIndex(prev => prev - 1);
      }
    } else if (dragDistance < 0) {
      if (motionState.constants[midIndex] !== -midIndex) {
        setMotionState(prev => ({
          ...prev,
          constants: prev.constants.map(item => item - 1),
          xConstant: prev.xConstant - 1
        }));
        setTextIndex(prev => prev + 1);
      }
    }
  };

  return (
    <div className="h-auto pb-24 pt-4 lg:pt-14 relative w-full">
      {/* SLIDES */}
      <div className="w-full h-auto overflow-hidden">
        <div
          className="flex cursor-grab xl:h-[109vh] 2xl:h-[89vh] justify-center py-[2rem] lg:py-[5rem] gap-10 lg:gap-[10rem] overflow-hidden"
          ref={slidersContainerRef}
          onMouseDown={handleDragStart}
          onMouseMove={dragState.isDragging ? handleDragMove : undefined}
          onMouseUp={dragState.isDragging ? handleDragEnd : undefined}
          onMouseLeave={dragState.isDragging ? handleDragEnd : undefined}
          onTouchStart={handleDragStart}
          onTouchMove={dragState.isDragging ? handleDragMove : undefined}
          onTouchEnd={dragState.isDragging ? handleDragEnd : undefined}
        >
          {productsDetails.map((product, index) => (
          <div>
            <motion.div
              className=" hidden 2xl:block w-[14.5rem] lg:w-[27.1rem] h-[20.7rem] lg:h-[38.7rem] bg-black flex-shrink-0 z-10"
              animate={{
                translateX: motionState.xConstant * (isLargeScreen ? 1.6 : 1) * motionState.distance,
                rotate: motionState.constants[index] * (isLargeScreen ? 15 : 30),
                translateY: Math.abs(motionState.constants[index]) * (isLargeScreen ? 110 : 5),
              }}
              transition={{ duration: 0.8, ease: easeInOut }}
              key={index}
            >
              <Image className="w-full h-full object-cover" src={product.image} alt={product.client} />
            </motion.div>

            <motion.div
              className=" hidden xl:block 2xl:hidden  w-[14.5rem] lg:w-[27.1rem] h-[20.7rem] lg:h-[38.7rem] bg-black flex-shrink-0 z-10"
              animate={{
                translateX: motionState.xConstant * (isLargeScreen ? 2.1 : 2) * motionState.distance,
                rotate: motionState.constants[index] * (isLargeScreen ? 15 : 30),
                translateY: Math.abs(motionState.constants[index]) * (isLargeScreen ? 110 : 5),
              }}
              transition={{ duration: 0.8, ease: easeInOut }}
              key={index}
            >
              <Image className="w-full h-full object-cover" src={product.image} alt={product.client} />
            </motion.div>

            <motion.div
              className=" block md:hidden  w-[14.5rem] lg:w-[27.1rem] h-[20.7rem] lg:h-[38.7rem] bg-black flex-shrink-0 z-10"
              animate={{
                translateX: motionState.xConstant * (isLargeScreen ? 3.7 : 3.3) * motionState.distance,
                rotate: motionState.constants[index] * (isLargeScreen ? 90 : 8),
                translateY: Math.abs(motionState.constants[index]) * (isLargeScreen ? 80 : 25),
              }}
              transition={{ duration: 0.8, ease: easeInOut }}
              key={index}
            >
              <Image className="w-full h-full object-cover" src={product.image} alt={product.client} />
            </motion.div>
          </div>
          ))}
        </div>
      </div>

      {/* DRAG SIGN */}
      <div className={`${showDragSign ? "lg:flex" : "lg:hidden"} absolute hidden items-center justify-center bg-white w-16 h-16 rounded-full left-1/2 top-[30rem] transform -translate-x-1/2 text-center z-20`}>
        <p>Drag</p>
      </div>

      {/* TEXT */}
      <div className="absolute bottom-10 left-0 w-full text-center z-20">
        <motion.h3
          key={textIndex}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="text-[1.5rem] z-10 lg:text-[2.25rem]"
        >
          {productsDetails[textIndex].client}
        </motion.h3>

        <AnimatePresence>
          <motion.h4
            key={textIndex}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="text-[1rem] lg:text-[1.5rem] text-productsTitle mt-3"
          >
            {productsDetails[textIndex].place}
          </motion.h4>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsSlider;