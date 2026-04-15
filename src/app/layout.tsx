import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김우혁 ♥ 노현정 결혼합니다",
  description: "2026년 6월 6일 토요일 오후 2시 · 더 링크 서울 웨딩홀",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600&family=Gowun+Dodum&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var lastScale = 1;
                document.addEventListener('touchstart', function(e) {
                  if (e.touches.length > 1) e.preventDefault();
                }, { passive: false });
                document.addEventListener('touchmove', function(e) {
                  if (e.touches.length > 1) e.preventDefault();
                  if (e.scale !== undefined && e.scale !== 1) e.preventDefault();
                }, { passive: false });
                document.addEventListener('touchend', function(e) {
                  lastScale = 1;
                }, { passive: false });
                document.addEventListener('gesturestart', function(e) {
                  e.preventDefault();
                }, { passive: false });
                document.addEventListener('gesturechange', function(e) {
                  e.preventDefault();
                  if (e.scale !== undefined && e.scale !== lastScale) {
                    lastScale = e.scale;
                  }
                }, { passive: false });
                document.addEventListener('gestureend', function(e) {
                  e.preventDefault();
                  lastScale = 1;
                }, { passive: false });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
