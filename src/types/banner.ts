import { StaticImageData } from "next/image";

export interface BannerImage {
  src: StaticImageData;
  alt: string;
}

export interface ProgressBarProps {
  progress: number;
  getProgressStyle: (progress: number, start: number, range: number) => string;
}

export interface SliderImageProps {
  index: number;
  initial: boolean;
  src: StaticImageData;
}

export interface ImageCounterProps {
  currentIndex: number;
  totalImages: number;
}

export interface HeroTitleProps {
  currImageIndex: number;
}