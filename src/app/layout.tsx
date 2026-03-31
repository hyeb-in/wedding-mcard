import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김우혁 ♥ 노현정 결혼합니다",
  description: "2026년 6월 6일 토요일 오후 2시 · 더 링크 서울 웨딩홀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
