import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SliderImageProps } from '@/types/banner';

const SliderImage: React.FC<SliderImageProps> = ({ index, initial, src }) => (
  <div className="absolute top-0 w-full h-full">
    <div className="w-full h-full absolute top-0 left-0 flex items-center">
      <motion.div
        initial={initial ? { height: "100%" } : { height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-[100px] h-[100px] relative"
      >
        <Image
          src={src}
          alt="Banner image of nature,farms,beaches"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </div>
    <div className="w-full h-full flex items-center justify-start ml-5 md:ml-8">
      <p className="absolute text-[#EEF4F9] font-bold text-[1rem]">
        Next
      </p>
    </div>
  </div>
);

export default SliderImage;