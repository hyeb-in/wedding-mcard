"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionTitle, COLORS } from "./SectionWrapper";
import { ImagePlus, CheckCircle2, AlertCircle, X, Upload } from "lucide-react";

const MAX_FILES = 30;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

interface FileItem {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}

export function GuestPhotoUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((newFiles: File[]) => {
    const valid = newFiles
      .filter((f) => {
        if (!f.type.startsWith("image/")) return false;
        if (f.size > MAX_FILE_SIZE) return false;
        return true;
      })
      .slice(0, MAX_FILES - files.length);

    const items: FileItem[] = valid.map((f) => ({
      id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
      file: f,
      preview: URL.createObjectURL(f),
      status: "pending",
    }));

    setFiles((prev) => [...prev, ...items].slice(0, MAX_FILES));
  }, [files.length]);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const uploadAll = async () => {
    const pending = files.filter((f) => f.status === "pending");
    if (pending.length === 0) return;

    setUploading(true);

    const CONCURRENCY = 3;

    const uploadOne = async (item: FileItem) => {
      setFiles((prev) =>
        prev.map((f) => f.id === item.id ? { ...f, status: "uploading" } : f)
      );
      try {
        const formData = new FormData();
        formData.append("file", item.file);
        const res = await fetch("/api/upload-photo", { method: "POST", body: formData });
        const data = await res.json();
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: res.ok ? "done" : "error", error: res.ok ? undefined : data.error }
              : f
          )
        );
      } catch {
        setFiles((prev) =>
          prev.map((f) => f.id === item.id ? { ...f, status: "error", error: "네트워크 오류" } : f)
        );
      }
    };

    for (let i = 0; i < pending.length; i += CONCURRENCY) {
      await Promise.all(pending.slice(i, i + CONCURRENCY).map(uploadOne));
    }

    setUploading(false);
    setDone(true);
  };

  const uploadedCount = files.filter((f) => f.status === "done").length;
  const errorCount = files.filter((f) => f.status === "error").length;
  const pendingCount = files.filter((f) => f.status === "pending").length;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    addFiles(Array.from(e.dataTransfer.files));
  };

  if (done && errorCount === 0 && pendingCount === 0) {
    return (
      <SectionWrapper>
        <div style={{ padding: "48px 16px" }}>
          <SectionTitle ko="사진 공유" en="GUEST PHOTOS" />
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
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <CheckCircle2 size={48} style={{ color: COLORS.sage }} />
            </div>
            <h3 style={{ color: COLORS.dark, fontFamily: "Gowun Dodum, serif", fontSize: "1.1rem", marginBottom: 8 }}>
              사진이 전달되었습니다!
            </h3>
            <p style={{ color: COLORS.mid, fontSize: "0.85rem", lineHeight: 1.7 }}>
              {uploadedCount}장의 사진을 보내주셔서 감사해요 ✨
            </p>
            <button
              onClick={() => { setFiles([]); setDone(false); }}
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
              더 올리기
            </button>
          </motion.div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <div style={{ padding: "48px 16px" }}>
        <SectionTitle ko="사진 공유" en="GUEST PHOTOS" />

        <p
          style={{
            textAlign: "center",
            fontSize: "0.82rem",
            lineHeight: 1.8,
            fontFamily: "Gowun Dodum, serif",
            color: COLORS.mid,
            marginBottom: 24,
          }}
        >
          함께한 소중한 순간을 나눠주세요
          <br />
          최대 {MAX_FILES}장까지 한 번에 올릴 수 있어요
        </p>

        {/* Drop zone */}
        {files.length < MAX_FILES && (
          <motion.div
            whileTap={{ scale: 0.98 }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            style={{
              border: `2px dashed ${COLORS.border}`,
              borderRadius: 16,
              padding: "32px 16px",
              textAlign: "center",
              cursor: "pointer",
              background: COLORS.cream,
              marginBottom: 16,
            }}
          >
            <ImagePlus size={32} style={{ color: COLORS.mid, margin: "0 auto 12px" }} />
            <p style={{ fontFamily: "Gowun Dodum, serif", color: COLORS.mid, fontSize: "0.85rem" }}>
              사진을 선택하거나 여기에 끌어다 놓으세요
            </p>
            <p style={{ fontFamily: "Gowun Dodum, serif", color: COLORS.border, fontSize: "0.75rem", marginTop: 4 }}>
              JPG, PNG, WEBP · 장당 최대 20MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => addFiles(Array.from(e.target.files ?? []))}
            />
          </motion.div>
        )}

        {/* File count indicator */}
        {files.length > 0 && (
          <p style={{
            fontFamily: "Gowun Dodum, serif",
            fontSize: "0.78rem",
            color: COLORS.mid,
            textAlign: "right",
            marginBottom: 12,
          }}>
            {files.length} / {MAX_FILES}장
          </p>
        )}

        {/* Preview grid */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
                marginBottom: 20,
              }}
            >
              {files.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ position: "relative", aspectRatio: "1", borderRadius: 10, overflow: "hidden" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.preview}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Status overlay */}
                  {item.status === "uploading" && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(0,0,0,0.45)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: 20, height: 20, border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%" }}
                      />
                    </div>
                  )}
                  {item.status === "done" && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(0,0,0,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <CheckCircle2 size={22} color="white" />
                    </div>
                  )}
                  {item.status === "error" && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(180,0,0,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <AlertCircle size={22} color="white" />
                    </div>
                  )}

                  {/* Remove button (only for pending) */}
                  {item.status === "pending" && (
                    <button
                      onClick={() => removeFile(item.id)}
                      style={{
                        position: "absolute", top: 4, right: 4,
                        background: "rgba(0,0,0,0.5)",
                        border: "none", borderRadius: "50%",
                        width: 20, height: 20,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", padding: 0,
                      }}
                    >
                      <X size={12} color="white" />
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress info */}
        {uploading && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              background: COLORS.bg,
              borderRadius: 100,
              height: 6,
              overflow: "hidden",
              marginBottom: 8,
            }}>
              <motion.div
                style={{
                  height: "100%",
                  background: COLORS.sage,
                  borderRadius: 100,
                }}
                animate={{ width: `${(uploadedCount / files.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p style={{ fontFamily: "Gowun Dodum, serif", fontSize: "0.78rem", color: COLORS.mid, textAlign: "center" }}>
              {uploadedCount} / {files.length}장 업로드 중...
            </p>
          </div>
        )}

        {/* Error summary */}
        {errorCount > 0 && !uploading && (
          <p style={{ fontFamily: "Gowun Dodum, serif", fontSize: "0.78rem", color: "#c0392b", textAlign: "center", marginBottom: 12 }}>
            {errorCount}장 업로드 실패 — 다시 시도해주세요
          </p>
        )}

        {/* Upload button */}
        {files.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={uploadAll}
            disabled={uploading || pendingCount === 0}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 16,
              border: "none",
              background: uploading || pendingCount === 0 ? "#D0CCCC" : COLORS.sage,
              color: COLORS.dark,
              fontFamily: "Gowun Dodum, serif",
              fontSize: "0.95rem",
              cursor: uploading || pendingCount === 0 ? "not-allowed" : "pointer",
              letterSpacing: "0.08em",
              boxShadow: uploading || pendingCount === 0 ? "none" : "0 4px 20px rgba(192,211,180,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Upload size={16} />
            {uploading
              ? "업로드 중..."
              : pendingCount === 0
              ? "업로드 완료"
              : `${pendingCount}장 업로드하기`}
          </motion.button>
        )}
      </div>
    </SectionWrapper>
  );
}
