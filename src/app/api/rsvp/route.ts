import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, status, count, meal, message } = body;

    if (!name || !status) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.NODE_ENV === "production"
        ? "https://wedding-mcard.vercel.app/api/auth/callback"
        : "http://localhost:3000/api/auth/callback"
    );
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const sheets = google.sheets({ version: "v4", auth: oauth2Client });

    const statusMap: Record<string, string> = { yes: "참석", no: "불참", maybe: "미정" };
    const mealMap: Record<string, string> = { yes: "식사함", no: "식사 안함", "": "-" };

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "RSVP!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
          name,
          statusMap[status] ?? status,
          status === "yes" ? count : "-",
          mealMap[meal ?? ""] ?? meal ?? "-",
          message || "",
        ]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP API error:", error);
    return NextResponse.json({ error: "제출에 실패했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
