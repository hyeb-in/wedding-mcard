"use client";

import { useState, useEffect } from "react";
import { SectionWrapper, SectionTitle, COLORS } from "./SectionWrapper";
import { WEDDING_DATE } from "./weddingData";

function getTimeLeft(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, past: false };
}

interface TimeBoxProps {
  value: number;
  label: string;
}

function TimeBox({ value, label }: TimeBoxProps) {
  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 0 }}>
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          width: "clamp(40px, 12vw, 60px)",
          height: "clamp(50px, 14vw, 65px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(61,48,40,0.06)",
        }}
      >
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
            color: COLORS.dark,
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        style={{
          fontSize: "0.55rem",
          color: COLORS.mid,
          letterSpacing: "0.1em",
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  // Start as null to avoid SSR/CSR hydration mismatch (Date.now() differs)
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(WEDDING_DATE));
    const interval = setInterval(() => {
      setTime(getTimeLeft(WEDDING_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper>
      <div
        className="mx-4 rounded-3xl overflow-hidden"
        style={{
          background: "#FFFFFF",
          border: `1px solid ${COLORS.border}`,
          padding: "28px 20px",
          margin: "0 16px",
          boxSizing: "border-box",
        }}
      >
        <SectionTitle ko="결혼식까지" en="COUNTDOWN" />

        {/* Skeleton shown during SSR / before hydration */}
        {!time ? (
          <div
            className="flex items-start justify-center gap-1"
            style={{ overflowX: "auto", paddingBottom: 8 }}
          >
            {["DAYS", "HOURS", "MINUTES", "SECONDS"].map((label, i) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1"
                style={{ minWidth: "clamp(40px, 12vw, 60px)" }}
              >
                {i > 0 && (
                  <span
                    style={{
                      color: COLORS.gold,
                      fontSize: "1.1rem",
                      marginTop: "18px",
                      fontFamily: "Cormorant Garamond",
                      position: "absolute",
                      marginLeft: -18,
                    }}
                  >
                    :
                  </span>
                )}
                <div
                  style={{
                    background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    width: "clamp(40px, 12vw, 60px)",
                    height: "clamp(50px, 14vw, 65px)",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.55rem",
                    color: COLORS.mid,
                    letterSpacing: "0.1em",
                    fontFamily: "Cormorant Garamond, serif",
                    fontStyle: "italic",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        ) : time.past ? (
          <div
            className="text-center"
            style={{ color: COLORS.rose, fontSize: "1.2rem" }}
          >
            결혼식 날이 됐습니다! 축하합니다!
          </div>
        ) : (
          <>
            <div
              className="flex items-start justify-center gap-1"
              style={{
                flexWrap: "nowrap",
                overflowX: "auto",
                paddingBottom: 8,
              }}
            >
              <TimeBox value={time.days} label="DAYS" />
              <span
                style={{
                  color: COLORS.gold,
                  fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
                  marginTop: "18px",
                  fontFamily: "Cormorant Garamond",
                }}
              >
                :
              </span>
              <TimeBox value={time.hours} label="HOURS" />
              <span
                style={{
                  color: COLORS.gold,
                  fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
                  marginTop: "18px",
                  fontFamily: "Cormorant Garamond",
                }}
              >
                :
              </span>
              <TimeBox value={time.minutes} label="MINUTES" />
              <span
                style={{
                  color: COLORS.gold,
                  fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
                  marginTop: "18px",
                  fontFamily: "Cormorant Garamond",
                }}
              >
                :
              </span>
              <TimeBox value={time.seconds} label="SECONDS" />
            </div>

            <p
              className="text-center mt-4"
              style={{
                color: COLORS.mid,
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                fontFamily: "Gowun Dodum, serif",
              }}
            >
              저희 결혼식까지{" "}
              <strong style={{ color: COLORS.rose }}>{time.days}일</strong>{" "}
              남았습니다
            </p>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
