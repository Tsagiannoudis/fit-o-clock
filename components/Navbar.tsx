"use client";

import NavLinksMainData from "@/data/NavLinksMainData";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useState } from "react";

type NavbarProps = {
  logoPlaceholderRef: RefObject<HTMLDivElement | null>;
  isLogoVisible: boolean;
};

const NavLink = ({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-2xl px-3 py-2 text-lg font-medium transition-all duration-200 ${
        isActive
          ? "bg-[#DAEC40] text-black outline-2 outline-offset-[-2px] outline-[#DAEC40]"
          : "text-gray-300 hover:text-[#DAEC40]"
      }`}
    >
      {label}
    </Link>
  );
};

const Navbar = ({
  logoPlaceholderRef,
  isLogoVisible,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#111111] text-white">
      <nav className="container mx-auto flex h-24 items-center justify-between px-4">
        {/* Η τελική θέση του animated logo */}
        <div
          ref={logoPlaceholderRef}
          className="relative h-[70px] w-[100px]"
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

        {/* Desktop menu */}
        <ul className="hidden items-center gap-6 md:flex">
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

        <Link
          href="/get-started"
          className="hidden bg-[#DAEC40] px-6 py-4 font-semibold uppercase text-black transition-colors hover:bg-[#c4d33a] md:block"
        >
          Ξεκίνα τώρα!
        </Link>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="p-2 text-white md:hidden"
          aria-label={isMenuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          aria-expanded={isMenuOpen}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="my-1.5 block h-0.5 w-6 bg-current" />
          <span className="block h-0.5 w-6 bg-current" />
        </button>

        {/* Mobile menu */}
        <div
          className={`absolute left-0 right-0 top-full border-t border-white/10 bg-[#111111] md:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col items-center gap-5 py-6">
            {NavLinksMainData.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  pathname={pathname}
                />
              </li>
            ))}

            <li>
              <Link
                href="/get-started"
                className="inline-block bg-[#DAEC40] px-6 py-4 font-semibold uppercase text-black"
              >
                Ξεκίνα τώρα!
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;