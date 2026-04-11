"use client";

import { useReportWebVitals } from "next/web-vitals";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const trackedMetrics = new Set(["CLS", "LCP", "INP", "FCP", "TTFB"]);
const webVitalsEndpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;

function roundMetricValue(metricName: string, metricValue: number) {
  if (metricName === "CLS") {
    return Number(metricValue.toFixed(4));
  }

  return Math.round(metricValue);
}

export default function WebVitalsTracker() {
  useReportWebVitals((metric) => {
    if (!trackedMetrics.has(metric.name)) {
      return;
    }

    const value = roundMetricValue(metric.name, metric.value);
    const payload = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value,
      rawValue: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      navigationType: metric.navigationType,
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });

    if (webVitalsEndpoint) {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(webVitalsEndpoint, payload);
      } else {
        void fetch(webVitalsEndpoint, {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
        });
      }
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", metric.name, {
        value,
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
        page_path: window.location.pathname,
        non_interaction: true,
      });
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("[WebVitals]", metric.name, value);
    }
  });

  return null;
}
