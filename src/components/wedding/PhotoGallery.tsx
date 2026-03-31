"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionTitle } from "./SectionWrapper";
import { PHOTOS } from "./weddingData";
import { useState } from "react";

interface PolaroidProps {
  src: string;
  caption: string;
  rotation: number;
  index: number;
  onClick: () => void;
}

function Polaroid({ src, caption, rotation, index, onClick }: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex-shrink-0 cursor-pointer"
      style={{
        background: "#FFFEFA",
        padding: "10px 10px 28px",
        borderRadius: 4,
        boxShadow:
          "0 4px 24px rgba(61,48,40,0.18), 0 1px 4px rgba(61,48,40,0.08)",
        width: 180,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 200,
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <p
        style={{
          textAlign: "center",
          marginTop: 10,
          fontSize: "0.72rem",
          color: "#6B5A4E",
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          letterSpacing: "0.05em",
        }}
      >
        {caption}
      </p>

      {/* Pin decoration */}
      <div
        style={{
          position: "absolute",
          top: -8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #E8A0A0, #C4837A)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      />
    </motion.div>
  );
}

export function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <SectionWrapper>
      <div style={{ padding: "48px 0" }}>
        <div style={{ padding: "0 16px" }}>
          <SectionTitle ko="우리의 이야기" en="OUR GALLERY" />
        </div>

        {/* Horizontal scroll polaroid gallery */}
        <div
          style={{
            overflowX: "auto",
            paddingBottom: 24,
            paddingTop: 16,
            scrollbarWidth: "none",
          }}
          className="[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            style={{
              display: "flex",
              gap: 20,
              paddingLeft: 24,
              paddingRight: 24,
              alignItems: "center",
            }}
          >
            {PHOTOS.map((photo, i) => (
              <Polaroid
                key={i}
                src={photo.src}
                caption={photo.caption}
                rotation={photo.rotation}
                index={i}
                onClick={() => setLightbox(i)}
              />
            ))}
          </div>
        </div>

        <p
          className="text-center"
          style={{
            fontSize: "0.72rem",
            color: "#9FB19F",
            marginTop: 4,
            letterSpacing: "0.05em",
          }}
        >
          ← 옆으로 밀어보세요 →
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(20,12,8,0.92)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: "#FFFEFA",
                padding: "12px 12px 36px",
                borderRadius: 4,
                maxWidth: "90vw",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[lightbox].src}
                alt={PHOTOS[lightbox].caption}
                style={{
                  maxWidth: "85vw",
                  maxHeight: "65vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <p
                style={{
                  textAlign: "center",
                  marginTop: 12,
                  fontFamily: "Cormorant Garamond, serif",
                  fontStyle: "italic",
                  color: "#6B5A4E",
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                }}
              >
                {PHOTOS[lightbox].caption}
              </p>
              <div className="flex justify-between mt-4 px-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(
                      (prev) => (prev! - 1 + PHOTOS.length) % PHOTOS.length,
                    );
                  }}
                  style={{
                    color: "#C4A055",
                    background: "none",
                    border: "none",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  ←
                </button>
                <button
                  onClick={() => setLightbox(null)}
                  style={{
                    color: "#C4837A",
                    background: "none",
                    border: "none",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  닫기
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) => (prev! + 1) % PHOTOS.length);
                  }}
                  style={{
                    color: "#C4A055",
                    background: "none",
                    border: "none",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
