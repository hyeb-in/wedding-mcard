"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionTitle, COLORS } from "./SectionWrapper";
import { ChevronDown, UserRound } from "lucide-react";
import { INTERVIEW_QA } from "./weddingData";

type Tab = "groom" | "bride";

interface QAItemProps {
  question: string;
  answer: string;
  index: number;
  color: string;
}

function QAItem({ question, answer, index, color }: QAItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${open ? color + "40" : COLORS.border}`,
        background: open ? `${color}08` : COLORS.card,
        overflow: "hidden",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1rem",
              color,
              fontStyle: "italic",
              flexShrink: 0,
              lineHeight: 1.5,
              marginTop: 1,
            }}
          >
            Q{index + 1}.
          </span>
          <p
            style={{
              fontFamily: "Gowun Dodum, serif",
              fontSize: "0.87rem",
              color: COLORS.dark,
              lineHeight: 1.6,
            }}
          >
            {question}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={18} style={{ color: COLORS.mid }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "12px 16px 16px 38px",
                borderTop: `1px solid ${color}20`,
              }}
            >
              <p
                style={{
                  fontSize: "0.84rem",
                  color: COLORS.mid,
                  lineHeight: 1.85,
                  fontFamily: "Gowun Dodum, serif",
                }}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function InterviewSection() {
  const [tab, setTab] = useState<Tab>("groom");

  return (
    <SectionWrapper>
      <div style={{ padding: "48px 16px", background: COLORS.cream }}>
        <SectionTitle ko="신랑 · 신부 인터뷰" en="INTERVIEW" />

        <p
          className="text-center mb-6"
          style={{
            fontSize: "0.82rem",
            color: COLORS.mid,
            lineHeight: 1.7,
            fontFamily: "Gowun Dodum, serif",
          }}
        >
          자주 받는 질문들에
          <br />두 사람이 직접 답했습니다
        </p>

        {/* Tab */}
        <div
          style={{
            display: "flex",
            background: COLORS.border + "50",
            borderRadius: 14,
            padding: 4,
            marginBottom: 20,
          }}
        >
          {(["groom", "bride"] as Tab[]).map((t) => (
            <motion.button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: 10,
                border: "none",
                background: tab === t ? COLORS.card : "transparent",
                color: tab === t ? COLORS.dark : COLORS.mid,
                fontFamily: "Gowun Dodum, serif",
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: tab === t ? "0 2px 8px rgba(61,48,40,0.08)" : "none",
                transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
              }}
            >
              <UserRound size={15} />
              {t === "groom" ? "신랑 김우혁" : "신부 노현정"}
            </motion.button>
          ))}
        </div>

        {/* Q&A list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: tab === "groom" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: tab === "groom" ? 20 : -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {INTERVIEW_QA.map((qa, i) => (
              <QAItem
                key={i}
                question={qa.question}
                answer={tab === "groom" ? qa.groomAnswer : qa.brideAnswer}
                index={i}
                color={tab === "groom" ? COLORS.rose : COLORS.sage}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
