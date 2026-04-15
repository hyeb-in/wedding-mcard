"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface OpeningAnimationProps {
  onEnter: () => void;
}

const PETAL_COLORS = ["#C0D3B4", "#D0E0C8", "#B0C8A4", "#9FB19F", "#CAD9C0"];

function SvgPetal({ colorIdx, size }: { colorIdx: number; size: number }) {
  const fill = PETAL_COLORS[colorIdx % PETAL_COLORS.length];
  const w = size;
  const h = Math.round(size * 1.55);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 16 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1 C13 7, 14 16, 8 24 C2 16, 3 7, 8 1Z"
        fill={fill}
        fillOpacity="0.7"
      />
      <path
        d="M8 2 C8 9, 8 16, 8 23"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OpeningAnimation({ onEnter }: OpeningAnimationProps) {
  const [phase, setPhase] = useState(0);

  const petals = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i / 28) * 100 + ((i * 13 + 7) % 11) - 5}%`,
        delay: (i * 0.2) % 6,
        duration: 5 + (i % 4),
        size: 10 + (i % 3) * 5,
        colorIdx: i % PETAL_COLORS.length,
        startRotation: (i * 30) % 360,
      })),
    [],
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: "#F4F8F4",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        touchAction: "none",
      }}
      onTouchMove={(e) => e.preventDefault()}
    >
      {/* Soft sparkle dots */}
      {Array.from({ length: 55 }, (_, i) => {
        const isGold = i % 7 === 0;
        const size = i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1;
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${(i * 7.3 + 3) % 100}%`,
              top: `${(i * 11.7 + 5) % 100}%`,
              width: size,
              height: size,
              background: isGold ? "#C0D3B4" : "#9FB19F",
              boxShadow: isGold
                ? `0 0 ${size * 3}px rgba(192,211,180,0.4)`
                : `0 0 ${size * 2}px rgba(159,177,159,0.35)`,
            }}
            animate={{ opacity: [0.1, isGold ? 0.6 : 0.5, 0.1] }}
            transition={{
              duration: 1.5 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.11) % 4,
            }}
          />
        );
      })}

      {/* Falling Petals — SVG shapes */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute pointer-events-none"
          style={{ left: petal.left, top: "-40px" }}
          animate={{
            y: ["0px", "110vh"],
            rotate: [petal.startRotation, petal.startRotation + 540],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <SvgPetal colorIdx={petal.colorIdx} size={petal.size} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
          animate={{
            opacity: phase >= 1 ? 1 : 0,
            scale: phase >= 1 ? 1 : 0.3,
            rotate: phase >= 1 ? 0 : -20,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 16 }}
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            color: "#9FB19F",
            letterSpacing: "0.4em",
            fontSize: "0.75rem",
            marginBottom: 16,
          }}
        >
          WEDDING INVITATION
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 30 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{
              fontFamily: "Noto Serif KR, serif",
              fontWeight: 300,
              color: "#2C3E2C",
              fontSize: "2.2rem",
              letterSpacing: "0.2em",
              lineHeight: 1.3,
              textShadow: "0 2px 16px rgba(140,200,100,0.5)",
            }}
          >
            김우혁
            <span
              style={{ color: "#C0D3B4", margin: "0 12px", fontSize: "1.6rem" }}
            >
              ♥
            </span>
            노현정
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            color: "#9FB19F",
            letterSpacing: "0.25em",
            fontSize: "0.85rem",
            marginTop: 12,
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          2026 · 06 · 06 · SAT
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 0.75 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            color: "#2E5828",
            fontSize: "0.75rem",
            marginTop: 6,
            letterSpacing: "0.1em",
          }}
        >
          더 링크 서울 웨딩홀
        </motion.p>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: phase >= 2 ? 60 : 0, opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #C0D3B4, transparent)",
            margin: "24px auto",
          }}
        />

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          style={{
            padding: "14px 42px",
            border: "1px solid rgba(159, 177, 159, 0.6)",
            color: "#C0D3B4",
            background: "rgba(244, 248, 244, 0.6)",
            borderRadius: "100px",
            fontFamily: "Gowun Dodum, serif",
            letterSpacing: "0.15em",
            cursor: "pointer",
            fontSize: "0.85rem",
            backdropFilter: "blur(6px)",
          }}
        >
          청첩장 열기
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 0.45 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8"
        style={{ color: "#2E5828", fontSize: "0.7rem", letterSpacing: "0.2em" }}
      >
        scroll to explore
      </motion.p>
    </motion.div>
  );
}
