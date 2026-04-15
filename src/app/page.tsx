"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Share2,
  CalendarDays,
  ImageIcon,
  MapPin,
  CheckSquare,
  BookOpen,
} from "lucide-react";

import { OpeningAnimation } from "@/components/wedding/OpeningAnimation";
import { HeroSection } from "@/components/wedding/HeroSection";
import { CountdownSection } from "@/components/wedding/CountdownSection";
import { BentoInfoSection } from "@/components/wedding/BentoInfoSection";
import { PhotoGallery } from "@/components/wedding/PhotoGallery";
import { LocationSection } from "@/components/wedding/LocationSection";
import { AccountSection } from "@/components/wedding/AccountSection";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { GuestbookSection } from "@/components/wedding/GuestbookSection";
import { ContactSection } from "@/components/wedding/ContactSection";
import { COLORS } from "@/components/wedding/SectionWrapper";

const WARM_GOLD = "rgba(192,211,180,0.9)";

const NAV_ITEMS = [
  { label: "정보", href: "#info", Icon: CalendarDays },
  { label: "갤러리", href: "#gallery", Icon: ImageIcon },
  { label: "오시는길", href: "#location", Icon: MapPin },
  { label: "RSVP", href: "#rsvp", Icon: CheckSquare },
  { label: "방명록", href: "#guestbook", Icon: BookOpen },
];

function FloatingNav({
  show,
  fontSize,
  onFontSizeChange,
}: {
  show: boolean;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}) {
  const isEnlarged = fontSize > 1;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: "calc(env(safe-area-inset-bottom, 20px) + 16px)",
            left: 0,
            right: 0,
            zIndex: 40,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => onFontSizeChange(isEnlarged ? 1 : 1.3)}
            style={{
              padding: "12px 22px",
              background: COLORS.cream,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 9999,
              color: COLORS.dark,
              fontFamily: "Gowun Dodum, serif",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(61,48,40,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = COLORS.card;
              el.style.boxShadow = "0 4px 12px rgba(61,48,40,0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = COLORS.cream;
              el.style.boxShadow = "0 2px 8px rgba(61,48,40,0.1)";
            }}
          >
            <span style={{ fontSize: "1.1em", fontWeight: 700, lineHeight: 1 }}>
              {isEnlarged ? "가" : "가"}
              <sup style={{ fontSize: "0.6em", verticalAlign: "super" }}>
                {isEnlarged ? "−" : "+"}
              </sup>
            </span>
            {isEnlarged ? "작은 글씨" : "큰 글씨"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [showOpening, setShowOpening] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [fontSize, setFontSize] = useState(1);

  useEffect(() => {
    if (showOpening) return;
    const onScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showOpening]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize * 16}px`;
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [fontSize]);

  return (
    <div
      className="grain-overlay"
      style={{
        fontFamily: "'Noto Serif KR', 'Gowun Dodum', serif",
        background: COLORS.bg,
        minHeight: "100vh",
      }}
    >
      {/* Opening Overlay */}
      <AnimatePresence>
        {showOpening && (
          <OpeningAnimation onEnter={() => setShowOpening(false)} />
        )}
      </AnimatePresence>

      {/* Main Invitation */}
      <main
        style={{
          maxWidth: 430,
          margin: "0 auto",
          overflowX: "hidden",
          paddingBottom: "calc(100px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <HeroSection />

        {/* Section spacer */}
        <div style={{ height: 8, background: COLORS.cream }} />

        {/* Greeting */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          style={{ padding: "52px 24px", textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              color: COLORS.gold,
              fontSize: "0.75rem",
              letterSpacing: "0.4em",
              marginBottom: 20,
            }}
          >
            INVITATION
          </p>
          <p
            style={{
              color: COLORS.dark,
              lineHeight: 2,
              fontSize: "0.9rem",
              fontFamily: "Noto Serif KR, serif",
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          >
            서로에게 가장 소중한 사람이
            <br />
            되어주겠다 약속한 두 사람이
            <br />
            이제 하나의 가정을 이루려 합니다.
          </p>
          <div
            style={{
              width: 1,
              height: 40,
              background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, transparent)`,
              margin: "24px auto",
            }}
          />
          <p
            style={{
              color: "#1c4429",
              lineHeight: 2,
              fontSize: "0.85rem",
              fontFamily: "Noto Serif KR, serif",
              fontWeight: 300,
            }}
          >
            바쁘신 중에도 오셔서
            <br />
            축복해 주시면 더없는 기쁨이 되겠습니다.
          </p>

          <div style={{ marginTop: 28 }}>
            <p
              style={{
                fontFamily: "Noto Serif KR, serif",
                fontWeight: 300,
                color: COLORS.dark,
                fontSize: "0.92rem",
                letterSpacing: "0.08em",
                lineHeight: 2,
              }}
            >
              김황중 · 성정선의 아들{" "}
              <strong style={{ fontWeight: 500 }}>우혁</strong>
            </p>
            <p
              style={{
                fontFamily: "Noto Serif KR, serif",
                fontWeight: 300,
                color: COLORS.dark,
                fontSize: "0.92rem",
                letterSpacing: "0.08em",
                lineHeight: 2,
              }}
            >
              노태훈 · 은진경의 딸{" "}
              <strong style={{ fontWeight: 500 }}>현정</strong>
            </p>
          </div>
        </motion.section>

        {/* Photo Gallery */}
        <section id="gallery" style={{ background: COLORS.bg }}>
          <PhotoGallery />
        </section>

        {/* Countdown */}
        <section style={{ padding: "8px 0 24px" }}>
          <CountdownSection />
        </section>

        {/* Bento Info */}
        <section id="info">
          <BentoInfoSection />
        </section>

        {/* Location */}
        <section id="location">
          <LocationSection />
        </section>

        {/* Account */}
        <section id="account">
          <AccountSection />
        </section>

        {/* RSVP */}
        <section id="rsvp">
          <RSVPSection />
        </section>

        {/* Guestbook */}
        <section id="guestbook">
          <GuestbookSection />
        </section>

        {/* Contact */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Floating Nav */}
      <FloatingNav
        show={!showOpening && showNav}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />
    </div>
  );
}
