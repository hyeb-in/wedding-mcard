import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic", "image/heif"];

function getOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.NODE_ENV === "production"
      ? "https://wedding-mcard.vercel.app/api/auth/callback"
      : "http://localhost:3000/api/auth/callback"
  );
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2Client;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "이미지 파일만 업로드 가능합니다." }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "파일 크기는 20MB 이하여야 합니다." }, { status: 400 });
    }

    const auth = getOAuthClient();
    const drive = google.drive({ version: "v3", auth });

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const timestamp = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }).replace(/[/:, ]/g, "-");
    const ext = file.name.split(".").pop() ?? "jpg";
    const fileName = `guest_${timestamp}_${Math.random().toString(36).slice(2, 6)}.${ext}`;

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: "id, name",
    });

    return NextResponse.json({ success: true, fileId: response.data.id, fileName: response.data.name });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "업로드에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
