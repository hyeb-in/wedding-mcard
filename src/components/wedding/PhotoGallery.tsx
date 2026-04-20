"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionTitle } from "./SectionWrapper";
import { PHOTOS } from "./weddingData";
import { useState, useEffect } from "react";

function thumbUrl(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=300&q=70`;
}

export function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const open = (i: number) => {
    setLightboxIndex(i);
  };

  const close = () => setLightboxIndex(null);

  const paginate = (newDir: number) => {
    if (lightboxIndex === null) return;
    const next = lightboxIndex + newDir;
    if (next < 0 || next >= PHOTOS.length) return;
    setDirection(newDir);
    setLightboxIndex(next);
  };

  // 라이트박스 열릴 때 스크롤 막기
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <SectionWrapper>
      <div style={{ padding: "48px 0 36px" }}>
        <div style={{ padding: "0 16px" }}>
          <SectionTitle ko="우리의 이야기" en="OUR GALLERY" />
        </div>

        {/* 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            marginTop: 24,
          }}
        >
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => open(i)}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                display: "block",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbUrl(photo.src)}
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* 라이트박스 */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={close}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                fontSize: "2rem",
                cursor: "pointer",
                lineHeight: 1,
                zIndex: 10,
              }}
            >
              ×
            </button>

            {/* 사진 */}
            <div
              style={{ position: "relative", width: "100%", overflow: "hidden" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={lightboxIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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
                    src={PHOTOS[lightboxIndex].src}
                    alt=""
                    draggable={false}
                    style={{
                      width: "100%",
                      maxHeight: "85svh",
                      objectFit: "contain",
                      display: "block",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 카운터 */}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.78rem",
                fontFamily: "Cormorant Garamond, serif",
                letterSpacing: "0.15em",
              }}
            >
              {lightboxIndex + 1} / {PHOTOS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
