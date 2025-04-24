import React, { useState } from 'react'
import {menus} from "@/assets/assets"
import { GoArrowRight } from "react-icons/go";
import { HiMenuAlt3 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div 
      className='px-3 py-3 relative'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className='w-full h-[70px] md:h-[101px] text-black bg-white backdrop-blur-sm px-4 md:px-10 flex items-center justify-between shadow-sm'>
        {/* Mobile Menu Button */}
        <motion.button 
          className='block lg:hidden relative'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <HiMenuAlt3 size={24} className="transition-transform duration-300" />
        </motion.button>

        {/* Desktop Menu */}
        <div className='hidden lg:flex items-center gap-5'>
          {menus.map((menu : string, index : number) => (
            <motion.p 
              key={index} 
              className='text-sm relative cursor-pointer group'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {menu}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
            </motion.p>
          ))}
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className='absolute top-full left-0 w-full bg-white backdrop-blur-sm shadow-lg py-4 px-6 lg:hidden z-50'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {menus.map((menu : string, index : number) => (
                <motion.p 
                  key={index} 
                  className='py-2 text-sm cursor-pointer relative group'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  {menu}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Button */}
        <motion.button 
          className='px-3 md:px-5 py-2 border border-black flex items-center gap-2 md:gap-5 hover:bg-black hover:text-white transition-all duration-300 relative overflow-hidden group'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="absolute inset-0 w-0 bg-black transition-all duration-300 ease-out group-hover:w-full -z-10" />
          <p className='text-sm md:text-base relative z-10'>Contact us</p>
          <GoArrowRight className='text-sm md:text-base relative z-10 transition-transform duration-300 group-hover:translate-x-1'/>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Navbar;