"use client";

import { Geist, Geist_Mono } from "next/font/google";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

  // Τελικός στόχος για desktop και mobile
  const desktopLogoRef = useRef<HTMLDivElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);

  const isLoading = phase !== "finished";

  useEffect(() => {
    document.title = "Fit O'Clock";
  }, []);

  const calculateTargetPosition = useCallback(() => {
    const animatedLogo = animatedLogoRef.current;

    if (!animatedLogo) return;

    const isMobile = window.innerWidth < 768;

    const targetLogo = isMobile
      ? mobileLogoRef.current
      : desktopLogoRef.current;

    if (!targetLogo) return;

    const animatedRect = animatedLogo.getBoundingClientRect();
    const targetRect = targetLogo.getBoundingClientRect();

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
  }, []);

  useLayoutEffect(() => {
    calculateTargetPosition();

    const handleResize = () => {
      // Επανυπολογισμός αν αλλάξει το μέγεθος ή ο προσανατολισμός
      calculateTargetPosition();
    };

    window.addEventListener("resize", handleResize);

    const startTimer = window.setTimeout(() => {
      calculateTargetPosition();
      setPhase("moving");
    }, 700);

    const finishTimer = window.setTimeout(() => {
      setPhase("finished");
    }, 1700);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateTargetPosition]);

  return (
    <html
      lang="el"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-black antialiased`}
    >
      <body
        className={`min-h-full bg-black ${
          isLoading ? "overflow-hidden" : ""
        }`}
      >
        <Navbar
          desktopLogoRef={desktopLogoRef}
          mobileLogoRef={mobileLogoRef}
          isLogoVisible={phase === "finished"}
          isNavbarContentVisible={phase !== "center"}
        />

        {/* Loading animation */}
        {phase !== "finished" && (
          <div
            className={`fixed inset-0 z-[100] bg-[#111111] transition-opacity duration-500 ${
              phase === "moving"
                ? "delay-[1700ms] opacity-0"
                : "opacity-100"
            }`}
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DAEC40]/10 blur-[100px] md:h-[450px] md:w-[450px]" />

            {/* Animated logo */}
            <div
              ref={animatedLogoRef}
              className="fixed left-1/2 top-1/2 h-[105px] w-[150px] will-change-transform md:h-[140px] md:w-[200px]"
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
                    ? `
                      transform 1000ms
                      cubic-bezier(0.76, 0, 0.24, 1)
                    `
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
                sizes="(max-width: 767px) 150px, 200px"
              />
            </div>

            {/* Loading line */}
            <div
              className={`absolute bottom-0 left-0 h-[2px] bg-[#DAEC40] transition-[width] duration-[1600ms] ease-out ${
                phase === "moving" ? "w-full" : "w-0"
              }`}
            />
          </div>
        )}

        <main
          className={`bg-black transition-opacity duration-700 ${
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