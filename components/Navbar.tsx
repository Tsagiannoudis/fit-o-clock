"use client";

import NavLinksMainData from "@/data/NavLinksMainData";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  desktopLogoRef: RefObject<HTMLDivElement | null>;
  mobileLogoRef: RefObject<HTMLDivElement | null>;
  isLogoVisible: boolean;
  isNavbarContentVisible: boolean;
};

type NavLinkProps = {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
};

const NavLink = ({
  href,
  label,
  pathname,
  onClick,
}: NavLinkProps) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-base font-medium transition-all duration-300 ${
        isActive
          ? "bg-[#DAEC40] text-black"
          : "text-[#EFEFEF]/80 hover:bg-white/5 hover:text-[#DAEC40]"
      }`}
    >
      {label}
    </Link>
  );
};

const Navbar = ({
  desktopLogoRef,
  mobileLogoRef,
  isLogoVisible,
  isNavbarContentVisible,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Κλείνει το menu όταν αλλάζει σελίδα
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Αποτρέπει scroll όταν είναι ανοιχτό το mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#111111]/90 text-white backdrop-blur-xl">
      <nav className="container relative mx-auto flex h-24 items-center justify-between px-4">
        {/* Desktop logo — αριστερά */}
        <div
          ref={desktopLogoRef}
          className="relative hidden h-[70px] w-[100px] md:block"
        >
          <Link
            href="/"
            aria-label="Αρχική σελίδα Fit O'Clock"
            className={`absolute inset-0 transition-opacity duration-300 ${
              isLogoVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/fit-o-clock-white.png"
              alt="Fit O'Clock"
              fill
              priority
              className="object-contain"
              sizes="100px"
            />
          </Link>
        </div>

        {/* Mobile logo — απόλυτα στο κέντρο του navbar */}
        <div
          ref={mobileLogoRef}
          className="absolute left-1/2 top-1/2 h-[56px] w-[80px] -translate-x-1/2 -translate-y-1/2 md:hidden"
        >
          <Link
            href="/"
            aria-label="Αρχική σελίδα Fit O'Clock"
            className={`absolute inset-0 transition-opacity duration-300 ${
              isLogoVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/fit-o-clock-white.png"
              alt="Fit O'Clock"
              fill
              priority
              className="object-contain"
              sizes="80px"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div
          className={`hidden transition-all duration-500 md:block ${
            isNavbarContentVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <ul className="flex items-center gap-2 lg:gap-4">
            {NavLinksMainData.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  pathname={pathname}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop CTA */}
        <div
          className={`hidden transition-all delay-100 duration-500 md:block ${
            isNavbarContentVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <Link
            href="/get-started"
            className="inline-flex min-h-12 items-center justify-center bg-[#DAEC40] px-6 text-sm font-bold uppercase tracking-wide text-black transition-all duration-300 hover:bg-[#efff58]"
          >
            Ξεκίνα τώρα
          </Link>
        </div>

        {/* Mobile spacer, κρατά το hamburger δεξιά */}
        <div className="h-10 w-10 md:hidden" />

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className={`relative z-20 flex h-11 w-11 flex-col items-center justify-center gap-[5px] transition-all duration-500 md:hidden ${
            isNavbarContentVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
          aria-label={
            isMenuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span
            className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${
              isMenuOpen
                ? "translate-y-[7px] rotate-45"
                : ""
            }`}
          />

          <span
            className={`block h-[2px] w-6 bg-white transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />

          <span
            className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${
              isMenuOpen
                ? "-translate-y-[7px] -rotate-45"
                : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`absolute left-0 top-full h-[calc(100dvh-6rem)] w-full overflow-hidden bg-[#111111]/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMenuOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 py-10">
          <ul className="flex flex-col gap-3">
            {NavLinksMainData.map((link, index) => (
              <li
                key={link.href}
                style={{
                  transitionDelay: isMenuOpen
                    ? `${index * 70}ms`
                    : "0ms",
                }}
                className={`border-b border-white/10 pb-3 transition-all duration-500 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-5 opacity-0"
                }`}
              >
                <Link
                  href={link.href}
                  className={`block py-3 text-3xl font-black uppercase tracking-tight ${
                    pathname === link.href
                      ? "text-[#DAEC40]"
                      : "text-[#EFEFEF]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <Link
              href="/get-started"
              className="flex min-h-14 w-full items-center justify-center bg-[#DAEC40] px-6 font-black uppercase text-black"
            >
              Ξεκίνα τώρα
            </Link>

            <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-white/35">
              It&apos;s your time
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;