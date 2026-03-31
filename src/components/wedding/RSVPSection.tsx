"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionTitle, COLORS } from "./SectionWrapper";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

type AttendStatus = "yes" | "no" | "maybe" | "";

interface RSVPData {
  name: string;
  status: AttendStatus;
  count: number;
  meal: string;
  message: string;
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: `1px solid ${COLORS.border}`,
  background: COLORS.card,
  color: COLORS.dark,
  fontFamily: "Gowun Dodum, serif",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  fontSize: "0.78rem",
  color: COLORS.mid,
  letterSpacing: "0.08em",
  marginBottom: 8,
  display: "block",
  fontFamily: "Gowun Dodum, serif",
};

const STATUS_ICONS = {
  yes: CheckCircle2,
  no: XCircle,
  maybe: HelpCircle,
};

function RadioOption({
  label,
  value,
  selected,
  onClick,
}: {
  label: string;
  value: "yes" | "no" | "maybe";
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = STATUS_ICONS[value];
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        flex: 1,
        padding: "12px 8px",
        borderRadius: 12,
        border: `1.5px solid ${selected ? COLORS.rose : COLORS.border}`,
        background: selected ? `${COLORS.rose}12` : COLORS.card,
        color: selected ? COLORS.rose : COLORS.mid,
        fontFamily: "Gowun Dodum, serif",
        fontSize: "0.82rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        transition: "all 0.2s",
      }}
    >
      <Icon size={20} />
      {label}
    </motion.button>
  );
}

function MealOption({
  label,
  value,
  selected,
  onClick,
}: {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px 8px",
        borderRadius: 10,
        border: `1.5px solid ${selected ? COLORS.sage : COLORS.border}`,
        background: selected ? `${COLORS.sage}15` : COLORS.card,
        color: selected ? COLORS.sage : COLORS.mid,
        fontFamily: "Gowun Dodum, serif",
        fontSize: "0.8rem",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {label}
    </motion.button>
  );
}

const fireConfetti = () => {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio: number, opts: object) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ["#C4A055", "#C4837A", "#7E9E78"],
  });
  fire(0.2, { spread: 60, colors: ["#FDF8F3", "#E8D9CC"] });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#C4A055", "#C4837A"],
  });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

export function RSVPSection() {
  const [form, setForm] = useState<RSVPData>({
    name: "",
    status: "",
    count: 1,
    meal: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("성함을 입력해주세요.");
      return;
    }
    if (!form.status) {
      setError("참석 여부를 선택해주세요.");
      return;
    }
    if (form.status === "yes" && !form.meal) {
      setError("식사 여부를 선택해주세요.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (form.status === "yes") {
        setTimeout(fireConfetti, 200);
      }
      try {
        const existing = JSON.parse(
          localStorage.getItem("wedding_rsvp") || "[]",
        );
        existing.push({ ...form, date: new Date().toISOString() });
        localStorage.setItem("wedding_rsvp", JSON.stringify(existing));
      } catch {
        // ignore storage errors
      }
    }, 800);
  };

  if (submitted) {
    return (
      <SectionWrapper>
        <div style={{ padding: "48px 16px" }}>
          <SectionTitle ko="참석 여부" en="RSVP" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: COLORS.cream,
              borderRadius: 24,
              padding: "40px 24px",
              textAlign: "center",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {form.status === "yes" ? (
                <CheckCircle2 size={48} style={{ color: COLORS.sage }} />
              ) : form.status === "no" ? (
                <XCircle size={48} style={{ color: COLORS.mid }} />
              ) : (
                <HelpCircle size={48} style={{ color: COLORS.gold }} />
              )}
            </div>
            <h3
              style={{
                color: COLORS.dark,
                fontFamily: "Gowun Dodum, serif",
                fontSize: "1.1rem",
                marginBottom: 8,
              }}
            >
              {form.status === "yes"
                ? "참석해 주셔서 감사합니다!"
                : form.status === "no"
                  ? "아쉽지만 마음 감사해요"
                  : "편하실 때 다시 알려주세요"}
            </h3>
            <p
              style={{
                color: COLORS.mid,
                fontSize: "0.85rem",
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: COLORS.rose }}>{form.name}</strong>님의
              답변을
              <br />잘 받았습니다.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  status: "",
                  count: 1,
                  meal: "",
                  message: "",
                });
              }}
              style={{
                marginTop: 20,
                padding: "10px 24px",
                borderRadius: 100,
                border: `1px solid ${COLORS.border}`,
                background: "transparent",
                color: COLORS.mid,
                fontFamily: "Gowun Dodum, serif",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              다시 입력하기
            </button>
          </motion.div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <div style={{ padding: "48px 16px", background: COLORS.cream }}>
        <SectionTitle ko="참석 여부" en="RSVP" />

        <p
          className="text-center mb-6"
          style={{
            fontSize: "0.82rem",
            lineHeight: 1.8,
            fontFamily: "Gowun Dodum, serif",
          }}
        >
          참석 여부를 알려주시면
          <br />
          소중한 자리 준비에 큰 도움이 됩니다
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Name */}
          <div>
            <label style={labelStyle}>성함</label>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />
          </div>

          {/* Attendance */}
          <div>
            <label style={labelStyle}>참석 여부</label>
            <div style={{ display: "flex", gap: 8 }}>
              <RadioOption
                label="참석"
                value="yes"
                selected={form.status === "yes"}
                onClick={() => setForm({ ...form, status: "yes" })}
              />
              <RadioOption
                label="불참"
                value="no"
                selected={form.status === "no"}
                onClick={() =>
                  setForm({ ...form, status: "no", meal: "", count: 1 })
                }
              />
              <RadioOption
                label="미정"
                value="maybe"
                selected={form.status === "maybe"}
                onClick={() => setForm({ ...form, status: "maybe" })}
              />
            </div>
          </div>

          {/* Count - only if attending */}
          <AnimatePresence>
            {form.status === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <div>
                    <label style={labelStyle}>참석 인원</label>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <button
                        onClick={() =>
                          setForm({
                            ...form,
                            count: Math.max(1, form.count - 1),
                          })
                        }
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          border: `1px solid ${COLORS.border}`,
                          background: COLORS.card,
                          color: COLORS.dark,
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "1.4rem",
                          color: COLORS.dark,
                          minWidth: 24,
                          textAlign: "center",
                        }}
                      >
                        {form.count}
                      </span>
                      <button
                        onClick={() =>
                          setForm({
                            ...form,
                            count: Math.min(10, form.count + 1),
                          })
                        }
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          border: `1px solid ${COLORS.border}`,
                          background: COLORS.card,
                          color: COLORS.dark,
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                      <span style={{ fontSize: "0.82rem", color: COLORS.mid }}>
                        명
                      </span>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>식사 여부</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <MealOption
                        label="식사함"
                        value="yes"
                        selected={form.meal === "yes"}
                        onClick={() => setForm({ ...form, meal: "yes" })}
                      />
                      <MealOption
                        label="식사 안함"
                        value="no"
                        selected={form.meal === "no"}
                        onClick={() => setForm({ ...form, meal: "no" })}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message */}
          <div>
            <label style={labelStyle}>메시지 (선택)</label>
            <textarea
              placeholder="축하 메시지를 남겨주세요"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              style={{
                ...inputStyle,
                resize: "none",
                lineHeight: 1.7,
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                color: COLORS.rose,
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "16px",
              borderRadius: 16,
              border: "none",
              background: loading ? "#D0CCCC" : "#C0D3B4",
              color: "#2C3E2C",
              fontFamily: "Gowun Dodum, serif",
              fontSize: "0.95rem",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.08em",
              boxShadow: loading ? "none" : "0 4px 20px rgba(192,211,180,0.4)",
            }}
          >
            {loading ? "전송 중..." : "참석 여부 알리기 ✓"}
          </motion.button>
        </div>
      </div>
    </SectionWrapper>
  );
}
