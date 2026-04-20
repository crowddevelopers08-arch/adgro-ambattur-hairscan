"use client";

import { ReactNode, useEffect, useState } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

interface RevealProps {
  children: ReactNode;
  dir?: RevealDirection;
  delay?: number;
  className?: string;
}

const offsetByDirection: Record<RevealDirection, string> = {
  up: "translateY(20px)",
  down: "translateY(-20px)",
  left: "translateX(20px)",
  right: "translateX(-20px)",
  fade: "translateY(0px)",
};

export function Reveal({
  children,
  dir = "up",
  delay = 0,
  className,
}: RevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), Math.max(0, delay) * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : offsetByDirection[dir],
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

