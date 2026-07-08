'use client';

import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: boolean;
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 1.0,
  stagger = 0.06,
  trigger = true,
}: SplitTextProps) {
  // Split string by words
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { 
      y: '105%',
      rotate: 2
    },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1] as any, // Premium slow cubic-bezier easing
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
        >
          <motion.span
            className="inline-block origin-left"
            variants={childVariants}
          >
            {word === '' ? '\u00A0' : word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
