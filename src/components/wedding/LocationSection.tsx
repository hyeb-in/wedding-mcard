"use client";

import { ReactNode } from "react";
import { MapPin, Navigation, Car, Train } from "lucide-react";
import { SectionWrapper, SectionTitle, COLORS } from "./SectionWrapper";
import { WEDDING_INFO } from "./weddingData";

interface TransportCardProps {
  icon: ReactNode;
  title: string;
  lines: string[];
}

function TransportCard({ icon, title, lines }: TransportCardProps) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "16px",
        flex: 1,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: COLORS.gold }}>{icon}</span>
        <p
          style={{
            fontFamily: "Gowun Dodum, serif",
            fontSize: "0.82rem",
            color: COLORS.dark,
          }}
        >
          {title}
        </p>
      </div>
      {lines.map((line, i) => (
        <p
          key={i}
          style={{ fontSize: "0.75rem", color: COLORS.dark, lineHeight: 1.8 }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export function LocationSection() {
  return (
    <SectionWrapper>
      <div style={{ padding: "48px 16px", background: COLORS.cream }}>
        <SectionTitle ko="오시는 길" en="LOCATION" />

        {/* Address */}
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: "16px",
            marginBottom: 16,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <MapPin
            size={18}
            style={{ color: COLORS.rose, flexShrink: 0, marginTop: 2 }}
          />
          <div>
            <p
              style={{
                fontFamily: "Gowun Dodum, serif",
                fontSize: "0.9rem",
                color: COLORS.dark,
              }}
            >
              {WEDDING_INFO.address}
            </p>
            <p style={{ fontSize: "0.75rem", color: COLORS.dark, marginTop: 4 }}>
              {WEDDING_INFO.venueDetail}
            </p>
          </div>
        </div>

        {/* Transportation */}

        <div style={{ display: "flex", gap: 10 }}>
          <TransportCard
            icon={<Train size={16} />}
            title="셔틀버스"
            lines={["신도림역 1번 출구", "상시 운행"]}
          />
          <TransportCard
            icon={<Car size={16} />}
            title="자가용"
            lines={["주차 1시간 30분 무료", "초과 시 15분당 1,000원"]}
          />
        </div>

        {/* Bus */}
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: "14px 16px",
            marginTop: 10,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <Navigation
            size={16}
            style={{ color: COLORS.sage, flexShrink: 0, marginTop: 2 }}
          />
          <div>
            <p
              style={{
                fontFamily: "Gowun Dodum, serif",
                fontSize: "0.82rem",
                color: COLORS.dark,
              }}
            >
              버스
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: COLORS.dark,
                marginTop: 4,
                lineHeight: 1.8,
              }}
            >
              경기일반: 10, 11-1, 11-2, 83, 88, 530
              <br />
              직행: 301, 320, 5200
              <br />
              간선: 160, 600, 603, 660, 662
              <br />
              마을: 양천04
              <br />
              지선: 6411, 6511, 6515, 6516, 6637, 6640A, 6640B, 6713
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
