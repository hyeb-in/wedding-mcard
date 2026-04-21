"use client";

import { useEffect } from "react";
import { WEDDING_INFO } from "./weddingData";

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? "";
const SITE_URL = "https://wedding-mcard.vercel.app";
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BLOB_BASE_URL}/main.jpg`;

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: object) => void;
      };
    };
  }
}

function initKakao() {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_KEY);
  }
}

function shareKakao() {
  initKakao();
  if (!window.Kakao?.Share) return;
  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: `${WEDDING_INFO.groomName} ♥ ${WEDDING_INFO.brideName} 결혼합니다`,
      description: `${WEDDING_INFO.dateStr} ${WEDDING_INFO.timeStr} · ${WEDDING_INFO.venue} ${WEDDING_INFO.venueDetail}`,
      imageUrl: IMAGE_URL,
      link: {
        mobileWebUrl: SITE_URL,
        webUrl: SITE_URL,
      },
    },
    buttons: [
      {
        title: "청첩장 보기",
        link: {
          mobileWebUrl: SITE_URL,
          webUrl: SITE_URL,
        },
      },
    ],
  });
}

export function KakaoShareButton() {
  useEffect(() => {
    if (document.getElementById("kakao-sdk")) return;
    const script = document.createElement("script");
    script.id = "kakao-sdk";
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.async = true;
    script.onload = initKakao;
    document.head.appendChild(script);
  }, []);

  return (
    <button
      onClick={shareKakao}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 16px",
        background: "transparent",
        border: "1px solid rgba(254,229,0,0.4)",
        borderRadius: 9999,
        color: "rgba(100,80,60,0.55)",
        fontFamily: "Gowun Dodum, serif",
        fontSize: "0.75rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(60,30,30,0.8)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(254,229,0,0.7)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(100,80,60,0.55)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(254,229,0,0.4)";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.477 2 11c0 2.828 1.63 5.325 4.132 6.862l-.9 3.367a.5.5 0 0 0 .713.548L9.99 19.27C10.647 19.42 11.317 19.5 12 19.5c5.523 0 10-3.477 10-8.5S17.523 3 12 3z" />
      </svg>
      카카오톡으로 공유하기
    </button>
  );
}
