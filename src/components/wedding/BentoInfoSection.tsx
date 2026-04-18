"use client";

import { ReactNode } from "react";
import { SectionWrapper, SectionTitle, COLORS } from "./SectionWrapper";
import { Calendar, Clock, MapPin, UtensilsCrossed } from "lucide-react";
import { WEDDING_INFO } from "./weddingData";

interface BentoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  wide?: boolean;
  accent?: boolean;
}

function BentoCard({ icon, label, value, sub, wide, accent }: BentoCardProps) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 20,
        padding: "20px 16px",
        gridColumn: wide ? "span 2" : "span 1",
        boxShadow: "0 2px 16px rgba(61,48,40,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: accent ? "rgba(196,160,85,0.15)" : COLORS.cream,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: COLORS.gold }}>{icon}</span>
      </div>
      <p
        style={{
          fontSize: "0.65rem",
          color: COLORS.mid,
          letterSpacing: "0.15em",
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
        }}
      >
        {label}
      </p>
      <p
        style={{
          color: COLORS.dark,
          fontSize: "0.95rem",
          lineHeight: 1.4,
          fontFamily: "Gowun Dodum, serif",
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            fontSize: "0.75rem",
            color: COLORS.mid,
            fontFamily: "Gowun Dodum, serif",
            whiteSpace: "pre-line",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export function BentoInfoSection() {
  return (
    <SectionWrapper>
      <div style={{ padding: "48px 16px" }}>
        <SectionTitle ko="예식 안내" en="WEDDING INFO" />

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {/* Date - wide */}
          <BentoCard
            icon={<Calendar size={16} />}
            label="DATE"
            value={WEDDING_INFO.dateStr}
            wide
            accent
          />

          {/* Time */}
          <BentoCard
            icon={<Clock size={16} />}
            label="TIME"
            value={WEDDING_INFO.timeStr}
          />

          {/* Venue - wide */}
          <BentoCard
            icon={<MapPin size={16} />}
            label="VENUE"
            value={WEDDING_INFO.venue}
            sub={`${WEDDING_INFO.venueDetail}\n${WEDDING_INFO.address}`}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
