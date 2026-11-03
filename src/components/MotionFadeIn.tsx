import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MotionFadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
  viewportAmount?: number | 'some' | 'all';
  once?: boolean;
}

export const MotionFadeIn: React.FC<MotionFadeInProps> = ({
  children,
  delay = 0,
  yOffset = 20,
  duration = 0.55,
  className = '',
  viewportMargin = '-25px',
  viewportAmount = 0.1,
  once = true,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: viewportMargin, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Luxury smooth easing curve
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 16 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
