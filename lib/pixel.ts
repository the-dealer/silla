// /lib/pixel.ts
// Wrapper de window.fbq. No-op si el pixel no está cargado.

declare global {
  interface Window {
    fbq?: (
      command: "init" | "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return
  try {
    window.fbq?.("trackCustom", eventName, params)
  } catch {
    /* noop */
  }
}
