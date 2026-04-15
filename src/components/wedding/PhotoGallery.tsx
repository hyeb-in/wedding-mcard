"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionTitle } from "./SectionWrapper";
import { PHOTOS } from "./weddingData";
import { useState } from "react";
import { COLORS } from "./SectionWrapper";

export function PhotoGallery() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDir: number) => {
    const next = current + newDir;
    if (next < 0 || next >= PHOTOS.length) return;
    setDirection(newDir);
    setCurrent(next);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <SectionWrapper>
      <div style={{ padding: "48px 0 36px" }}>
        <div style={{ padding: "0 16px" }}>
          <SectionTitle ko="우리의 이야기" en="OUR GALLERY" />
        </div>

        {/* Swipe photo area */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            marginTop: 24,
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) paginate(1);
                else if (info.offset.x > 50) paginate(-1);
              }}
              style={{ cursor: "grab" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[current].src}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: 380,
                  objectFit: "cover",
                  display: "block",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption */}
        <p
          style={{
            textAlign: "center",
            marginTop: 14,
            fontSize: "0.78rem",
            color: COLORS.mid,
            fontFamily: "Cormorant Garamond, serif",
            fontStyle: "italic",
            letterSpacing: "0.06em",
            minHeight: "1.2em",
          }}
        >
          {''}
        </p>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 14,
          }}
        >
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 9999,
                background: i === current ? COLORS.gold : COLORS.border,
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
