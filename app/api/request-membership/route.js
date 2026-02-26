import { NextResponse } from "next/server";

const WEBHOOK_URL = "https://n8nplus.com/webhook/request-membership";

export async function POST(request) {
  const body = await request.json();

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Webhook request failed" },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true });
}
