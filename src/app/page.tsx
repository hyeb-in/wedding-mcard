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

function FloatingNav({ show }: { show: boolean }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "김우혁 ♥ 노현정 결혼합니다",
          text: "2026년 6월 6일 토요일 오후 2시 30분 · 더 링크 서울",
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다! 🎊");
    }
  };

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
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 40,
            width: "calc(100% - 32px)",
            maxWidth: 398,
          }}
        >
          <div
            style={{
              background: "rgba(30,50,30,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 20,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              border: "1px solid rgba(192,211,180,0.25)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 4px",
                  textDecoration: "none",
                  color: WARM_GOLD,
                }}
              >
                <item.Icon size={17} strokeWidth={1.5} color={WARM_GOLD} />
                <span
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.02em",
                    fontFamily: "Gowun Dodum, serif",
                    color: WARM_GOLD,
                  }}
                >
                  {item.label}
                </span>
              </a>
            ))}
            <button
              onClick={handleShare}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "6px 4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: COLORS.gold,
              }}
            >
              <Share2 size={17} strokeWidth={1.5} color={COLORS.gold} />
              <span
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.02em",
                  fontFamily: "Gowun Dodum, serif",
                  color: COLORS.gold,
                }}
              >
                공유
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [showOpening, setShowOpening] = useState(true);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (showOpening) return;
    const onScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showOpening]);

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
          paddingBottom: 100,
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
              color: COLORS.mid,
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
      <FloatingNav show={!showOpening && showNav} />
    </div>
  );
}
