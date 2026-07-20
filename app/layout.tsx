"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type LoadingPhase = "center" | "moving" | "finished";

type LogoTransform = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [phase, setPhase] = useState<LoadingPhase>("center");

  const [logoTransform, setLogoTransform] = useState<LogoTransform>({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  });

  const animatedLogoRef = useRef<HTMLDivElement>(null);
  const navbarLogoRef = useRef<HTMLDivElement>(null);

  const isLoading = phase !== "finished";

  useEffect(() => {
    document.title = "Fit O'Clock";
  }, []);

  useLayoutEffect(() => {
    const animatedLogo = animatedLogoRef.current;
    const navbarLogo = navbarLogoRef.current;

    if (!animatedLogo || !navbarLogo) return;

    const calculateTargetPosition = () => {
      const animatedRect = animatedLogo.getBoundingClientRect();
      const targetRect = navbarLogo.getBoundingClientRect();

      const animatedCenterX =
        animatedRect.left + animatedRect.width / 2;

      const animatedCenterY =
        animatedRect.top + animatedRect.height / 2;

      const targetCenterX =
        targetRect.left + targetRect.width / 2;

      const targetCenterY =
        targetRect.top + targetRect.height / 2;

      setLogoTransform({
        x: targetCenterX - animatedCenterX,
        y: targetCenterY - animatedCenterY,
        scaleX: targetRect.width / animatedRect.width,
        scaleY: targetRect.height / animatedRect.height,
      });
    };

    calculateTargetPosition();

    window.addEventListener("resize", calculateTargetPosition);

    const startTimer = window.setTimeout(() => {
      setPhase("moving");
    }, 700);

    const finishTimer = window.setTimeout(() => {
      setPhase("finished");
    }, 1800);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener("resize", calculateTargetPosition);
    };
  }, []);

  return (
    <html
      lang="el"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full bg-black ${
          isLoading ? "overflow-hidden" : ""
        }`}
      >
        <Navbar
          logoPlaceholderRef={navbarLogoRef}
          isLogoVisible={phase === "finished"}
        />

        {/* Loading overlay */}
        {phase !== "finished" && (
          <div
            className={`fixed inset-0 z-[100] bg-[#111111] transition-opacity duration-500 ${
              phase === "moving"
                ? "delay-700 opacity-0"
                : "opacity-100"
            }`}
          >
            <div
              ref={animatedLogoRef}
              className="fixed left-1/2 top-1/2 h-[140px] w-[200px] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform:
                  phase === "moving"
                    ? `
                      translate(-50%, -50%)
                      translate3d(
                        ${logoTransform.x}px,
                        ${logoTransform.y}px,
                        0
                      )
                      scale(
                        ${logoTransform.scaleX},
                        ${logoTransform.scaleY}
                      )
                    `
                    : "translate(-50%, -50%) scale(1)",
                transition:
                  phase === "moving"
                    ? "transform 1000ms cubic-bezier(0.76, 0, 0.24, 1)"
                    : "none",
                transformOrigin: "center",
              }}
            >
              <Image
                src="/fit-o-clock-white.png"
                alt="Fit O'Clock"
                fill
                priority
                className="object-contain"
                sizes="200px"
              />
            </div>
          </div>
        )}

        <main
          className={`pt-24 transition-opacity duration-700 ${
            phase === "finished"
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}