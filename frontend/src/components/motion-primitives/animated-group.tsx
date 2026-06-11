'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';

export interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { opacity: 0, y: 20 },
};

export function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
}: AnimatedGroupProps) {
  const containerVariants = variants?.container || defaultContainerVariants;
  const itemVariants = variants?.item || defaultItemVariants;

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div variants={itemVariants} style={{ display: 'inherit', width: 'inherit', height: 'inherit', flexDirection: 'inherit' }}>
            {child}
          </motion.div>
        );
      })}
    </MotionTag>
  );
}
