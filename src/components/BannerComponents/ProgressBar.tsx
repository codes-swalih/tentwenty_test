import React from 'react';
import { ProgressBarProps } from '@/types/banner';

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, getProgressStyle }) => (
  <div className="w-full h-full cursor-pointer relative  ">
    {[0, 25, 50, 75].map((start, index) => (
      <div
        key={start}
        style={{
          [index % 2 === 0 ? 'width' : 'height']: getProgressStyle(progress, start, 25)
        }}
        className={`absolute bg-white ${
          index === 0 ? 'top-0 h-[0.5rem]' :
          index === 1 ? 'top-0 right-0 w-[0.5rem]' :
          index === 2 ? 'bottom-0 right-0 h-[0.5rem]' :
          'bottom-0 left-0 w-[0.5rem]'
        }`}
      />
    ))}
  </div>
);

export default ProgressBar;