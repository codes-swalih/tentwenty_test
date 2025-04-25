"use client";
import React from 'react';
import { motion } from "framer-motion";

function Title() {
  return (
    <div className="w-full lg:px-[21rem] mt-20 lg:mt-36">
      <div className="text-center">
        <motion.h1 
          className="text-[1.88rem] lg:text-[3.5rem] font-[380]"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'linear' }}
        >
          Quality Products
        </motion.h1>
        <motion.p 
          className="text-productsTitle px-8 lg:px-0 text-[1rem] lg:text-[1.5rem] leading-[1.15rem] lg:leading-[1.75rem] mt-8"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1,  }}
          transition={{ duration: 0.6, ease: 'backIn', delay: 0.2 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </motion.p>
      </div>
    </div>
  );
}
export default Title;