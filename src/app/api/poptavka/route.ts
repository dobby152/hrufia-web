import { NextRequest, NextResponse } from "next/server";

const BEARER_TOKEN = process.env.POPTAVKA_API_TOKEN;
const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!BEARER_TOKEN || auth !== `Bearer ${BEARER_TOKEN}`) {
    return unauthorized();
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { jmeno, telefon, email, sluzba, zprava } = body;

  if (!jmeno || !telefon || !zprava) {
    return NextResponse.json(
      { error: "Chybí povinná pole: jmeno, telefon, zprava" },
      { status: 422 }
    );
  }

  if (!CRM_WEBHOOK_URL) {
    return NextResponse.json({ error: "CRM webhook není nakonfigurován" }, { status: 500 });
  }

  const payload = {
    jmeno,
    telefon,
    email: email || null,
    sluzba: sluzba || null,
    zprava,
    zdroj: "hrufia-web",
    cas: new Date().toISOString(),
  };

  const crmRes = await fetch(CRM_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!crmRes.ok) {
    console.error("CRM webhook error:", crmRes.status, await crmRes.text());
    return NextResponse.json({ error: "CRM webhook selhal" }, { status: 502 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
