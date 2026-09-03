import { NextResponse, type NextRequest } from "next/server";
import {
  PENDING_NAME_COOKIE,
  sessionCookieOptions,
} from "@/lib/session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function errorRedirect(request: NextRequest) {
  return NextResponse.redirect(new URL("/get-started?error=1", request.url), {
    status: 303,
  });
}

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return errorRedirect(request);
  }

  // Honeypot checkbox — only present when checked. Do not use autofill-prone
  // text names like "company" (browsers fill those and bounce real users).
  if (form.get("tef_extra") === "1") {
    return NextResponse.redirect(new URL("/get-started", request.url), {
      status: 303,
    });
  }

  const emailRaw = String(form.get("email") ?? "").trim();
  const email = emailRaw.toLowerCase();
  // Optional display name — launch-token API has no name field, so this is
  // handed to /launch via a short-lived cookie and stored on app_users.
  const name = String(form.get("name") ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 120);

  if (!email || !EMAIL_RE.test(email)) {
    return errorRedirect(request);
  }

  const appId = process.env.LUDWITT_APP_ID;
  const apiKey = process.env.LUDWITT_API_KEY;
  const apiBase = (
    process.env.LUDWITT_API_BASE_URL || "http://localhost:4000/v1"
  ).replace(/\/$/, "");

  if (!appId || !apiKey) {
    console.error("get-started: LUDWITT_APP_ID or LUDWITT_API_KEY is not set");
    return errorRedirect(request);
  }

  let token: string | undefined;
  try {
    const res = await fetch(`${apiBase}/auth/launch-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: appId,
        user_id: email,
        email,
      }),
      // Railway can cold-start; give it a moment before failing the learner.
      signal: AbortSignal.timeout(20_000),
    });

    if (!res.ok) {
      console.error("get-started: launch-token failed", res.status);
      return errorRedirect(request);
    }

    const data = (await res.json()) as { token?: unknown };
    if (typeof data.token !== "string" || !data.token) {
      console.error("get-started: launch-token response missing token");
      return errorRedirect(request);
    }
    token = data.token;
  } catch (err) {
    console.error("get-started: launch-token request error", err);
    return errorRedirect(request);
  }

  const launchUrl = new URL("/launch", request.url);
  launchUrl.searchParams.set("token", token);
  const response = NextResponse.redirect(launchUrl, { status: 303 });
  if (name) {
    response.cookies.set(PENDING_NAME_COOKIE, name, {
      ...sessionCookieOptions(120),
    });
  }
  return response;
}
