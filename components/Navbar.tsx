"use client";

import NavLinksMainData from "@/data/NavLinksMainData";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Helper component to avoid repeating the link logic
const NavLink = ({ href, label, pathname }: { href: string, label: string, pathname: string }) => (
  <Link
    href={href}
    className={`px-2 py-1 text-lg font-medium transition-all duration-200 ${
      pathname === href
        ? "text-black p-2 border-2 rounded-2xl border-[#DAEC40] bg-[#DAEC40]"
        : "text-gray-300 hover:text-[#DAEC40] border-b-2 border-transparent"
    }`}
  >
    {label}
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="text-white fixed top-0 left-0 right-0 z-50 bg-[#111111]  max-w-[100%] mx-auto">
      <nav className="container mx-auto flex items-center justify-between pt-2 -pl-34 -pr-34">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              className="dark:invert"
              src="/fit-o-clock-white.png"
              alt="Fit-o-clock logo"
              width={100}
              height={20}
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NavLinksMainData.map((link) => (
              <li key={link.href} className="nav-item">
                <NavLink href={link.href} label={link.label} pathname={pathname} />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="hidden md:block">
          <Link
            href={"/get-started"} 
            className={"bg-[#daec40] p-4 text-black hover:bg-yellow-300 transition-colors uppercase font-semibold"}
          >
            Ξεκίνα τώρα!
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block border-t border-gray-700" : "hidden"}`}
      >
        <ul className="flex flex-col items-center gap-6 py-4">
          {NavLinksMainData.map((link) => (
            <li key={link.label}>
              <NavLink href={link.href} label={link.label} pathname={pathname} />
            </li>
          ))}
          <li>
            <Link
              href="/get-started" // Changed to a more descriptive URL
              className="bg-[#daec40] p-4 text-black hover:bg-yellow-300 transition-colors uppercase font-semibold"
            >
              Ξεκίνα τώρα!
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
