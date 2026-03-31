'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SectionWrapper({ children, className = '', delay = 0 }: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionTitleProps {
  ko: string;
  en: string;
}

export function SectionTitle({ ko, en }: SectionTitleProps) {
  return (
    <div className="text-center mb-8">
      <p
        style={{
          color: '#9FB19F',
          letterSpacing: '0.3em',
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
        }}
        className="text-xs"
      >
        {en}
      </p>
      <h2
        style={{
          color: '#9FB19F',
          letterSpacing: '0.05em',
          fontFamily: 'Gowun Dodum, serif',
          marginTop: '6px',
        }}
        className="text-xl"
      >
        {ko}
      </h2>
      <div
        style={{
          width: '36px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #9FB19F, transparent)',
          margin: '12px auto 0',
        }}
      />
    </div>
  );
}

export const COLORS = {
  bg: '#F4F8F4',
  cream: '#FFFFFF',
  rose: '#C0D3B4',
  sage: '#C0D3B4',
  gold: '#C0D3B4',
  dark: '#2C3E2C',
  mid: '#C0D3B4',
  border: '#C0D3B4',
  card: '#FFFFFF',
};
