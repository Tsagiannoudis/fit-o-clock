import Image from "next/image";
import Link from "next/link";
import NavLinksMainData from "@/data/NavLinksMainData";
import TrainingData from "@/data/TrainingData";
import LocationData from "@/data/LocationData";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Logo & About */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/fit-o-clock-white.png"
                alt="Fit O'Clock Logo"
                width={150}
                height={105}
                className="object-contain"
              />
            </Link>
            <p className="text-white-600 text-sm">
              Χτίσε το σώμα που θέλεις. Σύγχρονα προγράμματα εκγύμνασης και ευεξίας για κάθε επίπεδο.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#DAEC40] mb-4">
              Σελίδες
            </h3>
            <ul className="space-y-3">
              {NavLinksMainData.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#DAEC40] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Programs */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#DAEC40] mb-4">
              Προγράμματα
            </h3>
            <ul className="space-y-3">
              {TrainingData.slice(0, 5).map((program) => (
                <li key={program.id}>
                  <Link
                    href={`/trainings/${program.id}`}
                    className="text-gray-300 hover:text-[#DAEC40] transition-colors"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-[#DAEC40] mb-4">
              Βρες μας
            </h3>
            <ul className="space-y-4 text-gray-300">
              {LocationData.map((location) => (
                <li key={location.id} className="flex items-start gap-3">
                  <HiOutlineLocationMarker className="w-5 h-5 text-[#DAEC40] mt-1 shrink-0" />
                  <span>{location.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar: Copyright & Socials */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Fit O'Clock. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-500">
            &copy; Powered by tSagian Projects.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;