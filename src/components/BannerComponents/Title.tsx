import React from "react";
import { motion } from "framer-motion";
import { HeroTitleProps } from "../../types/banner";

const HeroTitle: React.FC<HeroTitleProps> = ({ currImageIndex }) => {
  return (
    <motion.div
      className="text-titleText text-white absolute z-10 top-[25%] lg:top-[18rem] left-[5%] lg:left-[10%]"
      key={currImageIndex}
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <h2 className="text-[0.85rem] lg:text-[1rem] font-[350]">
        Welcome To TenTwenty Farms
      </h2>
      <h1 className="text-[2.9rem] lg:text-[4rem] font-[350]  leading-none mt-5">
        From Our Farms <br />
        To Your Hands
      </h1>
    </motion.div>
  );
};

export default HeroTitle;
