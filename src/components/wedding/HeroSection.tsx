"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HERO_IMG = `${process.env.NEXT_PUBLIC_BLOB_BASE_URL}/main.webp`;

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Parallax bg image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG}
          alt="Wedding"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,12,8,0.25) 0%, rgba(20,12,8,0.1) 40%, rgba(20,12,8,0.7) 80%, rgba(30,18,12,0.92) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center"
      >
        {/* En label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            color: "rgba(253,248,243,0.7)",
            letterSpacing: "0.35em",
            fontSize: "0.7rem",
            marginBottom: 12,
          }}
        >
          WE ARE GETTING MARRIED
        </motion.p>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{
              fontFamily: "Noto Serif KR, serif",
              fontWeight: 300,
              color: "#FDF8F3",
              fontSize: "1.3rem",
              letterSpacing: "0.2em",
              lineHeight: 1.2,
              textShadow:
                "0 2px 20px rgba(0,0,0,0.3), 0 0 30px rgba(255,180,120,0.4)",
            }}
          >
            김우혁
          </h1>
          <div className="flex items-center gap-3 justify-center my-3">
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(192,211,180,0.6)",
              }}
            />
            <span style={{ color: "#C0D3B4", fontSize: "1.2rem" }}>♥</span>
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(192,211,180,0.6)",
              }}
            />
          </div>
          <h1
            style={{
              fontFamily: "Noto Serif KR, serif",
              fontWeight: 300,
              color: "#FDF8F3",
              fontSize: "1.3rem",
              letterSpacing: "0.2em",
              lineHeight: 1.2,
              textShadow:
                "0 2px 20px rgba(0,0,0,0.3), 0 0 30px rgba(255,180,120,0.4)",
            }}
          >
            노현정
          </h1>
        </motion.div>

        {/* Date & Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: "#C0D3B4",
              fontSize: "1.1rem",
              letterSpacing: "0.2em",
            }}
          >
            2026 · 06 · 06
          </p>
          <p
            style={{
              color: "rgba(253,248,243,0.75)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
            }}
          >
            토요일 오후 2시 30분 · 더 링크 서울 화이트 홀
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "rgba(253,248,243,0.5)", fontSize: "1.2rem" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
