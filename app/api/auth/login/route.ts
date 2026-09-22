import { NextRequest, NextResponse } from "next/server";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json(
      { error: "Admin login requires the database. Set DATABASE_URL to enable it." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const email = String(body?.email || "").toLowerCase().trim();
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(user.id, user.email);
  return NextResponse.json({ ok: true });
}
