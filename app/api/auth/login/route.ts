import { NextRequest, NextResponse } from "next/server";
import { isDatabaseEnabled } from "@/lib/database";
import { prisma } from "@/lib/prisma";
import {
  COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    if (!isDatabaseEnabled()) {
      return NextResponse.json(
        {
          error:
            "Admin login requires DATABASE_URL on the live host. Add it, then redeploy.",
        },
        { status: 503 }
      );
    }

    if (!process.env.JWT_SECRET?.trim()) {
      return NextResponse.json(
        {
          error:
            "JWT_SECRET is missing on the live host. Add it in env vars, then redeploy.",
        },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    const email = String(body?.email || "").toLowerCase().trim();
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createSessionToken(user.id, user.email);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("[auth/login]", err);
    const message = err instanceof Error ? err.message : "Login failed";
    const isConfig =
      /JWT_SECRET|DATABASE_URL|Database is disabled/i.test(message);
    const isDb =
      /P1001|P1017|Can't reach|ECONNREFUSED|timeout|Prisma/i.test(message);

    return NextResponse.json(
      {
        error: isConfig
          ? message
          : isDb
            ? "Cannot reach the database. Check DATABASE_URL (use Supabase session/transaction pooler) and that the schema is pushed."
            : "Server error during login. Check host logs for [auth/login].",
      },
      { status: 500 }
    );
  }
}
