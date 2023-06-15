"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
  isVisible: boolean;
  toggleVisibility: (val: boolean) => void;
  children: React.ReactNode;
};

const AnimatedModal = ({ isVisible, children, toggleVisibility }: Props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={(e) => {
            toggleVisibility(!isVisible);
          }}
          key='modal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='w-full fixed h-screen z-40 top-0 left-0 flex justify-center items-center bg-opacity-30 bg-black'
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              return;
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
