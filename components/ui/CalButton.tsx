"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

interface CalButtonProps {
  buttonText: string;
  calLink: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CalButton({ buttonText, calLink, className, children }: CalButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#e8590c" } },
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#e8590c",
            "cal-text": "#111111",
            "cal-text-muted": "#666666",
            "cal-bg": "#ffffff",
            "cal-bg-muted": "#f7f7f7",
            "cal-border": "#e0e0e0",
          },
          dark: {
            "cal-brand": "#e8590c",
            "cal-text": "#ffffff",
            "cal-text-muted": "#999999",
            "cal-bg": "#0a0a0a",
            "cal-bg-muted": "#141414",
            "cal-border": "#333333",
          },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace=""
      data-cal-link={calLink}
      data-cal-config='{"theme":"light"}'
      className={className || "btn btn--outline"}
    >
      {buttonText}
      {children}
    </button>
  );
}
