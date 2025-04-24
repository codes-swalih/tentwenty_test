import React from 'react';
import { ImageCounterProps } from '@/types/banner';

const ImageCounter: React.FC<ImageCounterProps> = ({ currentIndex, totalImages }) => (
  <div className="flex gap-4 items-center justify-between text-[#EEF4F9] ml-10 md:ml-0 text-[1rem] font-light">
    <p>{"0" + currentIndex}</p>
    <div className="h-px w-[6.4rem] bg-white" />
    <p>{"0" + totalImages}</p>
  </div>
);

export default ImageCounter;