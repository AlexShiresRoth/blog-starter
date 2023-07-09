"use client";
import { Faq } from "@/types/faq/faq.type";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

const FaqItem = (item: Faq["faQsCollection"]["items"][number]) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div
      className='flex flex-col pt-4 hover:bg-blue-white transition-colors hover:cursor-pointer'
      onClick={() => setShowAnswer(!showAnswer)}
      data-component-type='faq-item'
      data-aria-label='faq item'
    >
      <div className='border-b-[1px] border-gray-200 py-4 flex items-start justify-between'>
        <h4
          className={classNames("font-semibold text-lg", {
            "text-gray-700": showAnswer,
            "text-gray-400 hover:text-gray-600 transition-colors": !showAnswer,
          })}
        >
          {item.question}
        </h4>

        <button
          title='toggle faq button'
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <AnimatePresence>
            {showAnswer ? (
              <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-6 h-6 stroke-gray-600'
              >
                <path d='M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z'></path>
              </motion.svg>
            ) : (
              <motion.svg
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-6 h-6 stroke-gray-600'
              >
                <path d='M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z'></path>
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 300 }}
            className='flex items-center gap-4'
            // exit={{ opacity: 1, maxHeight: 300 }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-4 h-4  stroke-gray-300 fill-gray-300'
            >
              <path d='M5.00014 13.9999L5 5.00003L7 5L7.00011 11.9999L17.1719 12L13.2222 8.05027L14.6364 6.63606L21.0004 13L14.6364 19.364L13.2222 17.9498L17.172 14L5.00014 13.9999Z'></path>
            </svg>
            <motion.p className='text-gray-500 text-base p-4'>
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;
