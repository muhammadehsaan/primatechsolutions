import { NextResponse } from "next/server";

type WebVitalName = "CLS" | "LCP" | "INP" | "FCP" | "TTFB";

type WebVitalPayload = {
  id: string;
  name: WebVitalName;
  value: number;
  rawValue: number;
  delta: number;
  rating: "good" | "needs-improvement" | "poor";
  navigationType?: string;
  path: string;
  timestamp: string;
};

const VALID_METRICS = new Set<WebVitalName>(["CLS", "LCP", "INP", "FCP", "TTFB"]);

function isValidPayload(payload: Partial<WebVitalPayload>): payload is WebVitalPayload {
  return (
    typeof payload.id === "string" &&
    typeof payload.path === "string" &&
    typeof payload.value === "number" &&
    typeof payload.rawValue === "number" &&
    typeof payload.delta === "number" &&
    typeof payload.timestamp === "string" &&
    typeof payload.rating === "string" &&
    typeof payload.name === "string" &&
    VALID_METRICS.has(payload.name as WebVitalName)
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<WebVitalPayload>;

    if (!isValidPayload(payload)) {
      return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
    }

    // Store in your analytics/data warehouse if needed. For now, logs are enough to start monitoring.
    console.info(
      `[web-vitals] ${payload.name}=${payload.value} rating=${payload.rating} path=${payload.path} nav=${payload.navigationType ?? "unknown"}`,
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to parse web vitals event" }, { status: 400 });
  }
}
