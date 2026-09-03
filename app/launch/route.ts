import { NextResponse, type NextRequest } from "next/server";
import { verifyLaunchToken } from "@/lib/ludwitt/verifyLaunch";
import {
  PENDING_NAME_COOKIE,
  SESSION_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

function rejectionResponse() {
  return new NextResponse("Launch from Ludwitt/Hult", {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return rejectionResponse();
  }

  const verified = await verifyLaunchToken(token);
  if (!verified.ok) {
    return rejectionResponse();
  }

  const { sub, email } = verified.claims;
  const name = (request.cookies.get(PENDING_NAME_COOKIE)?.value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 120);

  let userId: string;
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("app_users")
      .upsert(
        name
          ? { ludwitt_sub: sub, email, name }
          : { ludwitt_sub: sub, email },
        { onConflict: "ludwitt_sub" },
      )
      .select("id")
      .single();

    if (error || !data?.id) {
      console.error("app_users upsert failed", error);
      return rejectionResponse();
    }
    userId = data.id;
  } catch (err) {
    console.error("launch upsert error", err);
    return rejectionResponse();
  }

  const sessionToken = await createSessionToken({
    userId,
    ludwittSub: sub,
    email,
  });

  const response = NextResponse.redirect(new URL("/paths/welcome", request.url));
  response.cookies.set(
    SESSION_COOKIE_NAME,
    sessionToken,
    sessionCookieOptions(),
  );
  if (name) {
    response.cookies.set(PENDING_NAME_COOKIE, "", sessionCookieOptions(0));
  }
  return response;
}
