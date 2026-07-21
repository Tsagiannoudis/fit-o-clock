import { FaPlus } from "react-icons/fa";
import React from "react";

const stats = [
  { value: "9", label: "χρόνια εμπειρίας" },
  { value: "7", label: "ομαδικά προγράμματα" },
  { value: "180", label: "ενεργά μέλη" },
  { value: "6", label: "Expert trainers" },
];

const MiddleHeroHome = () => {
  return (
    <section className="bg-[#DAEC40] py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-8">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center text-black">
                <div className="flex items-baseline">
                  <span className="text-5xl md:text-6xl font-black tracking-tighter">
                    {stat.value}
                  </span>
                  <FaPlus className="text-3xl md:text-4xl font-black ml-1" />
                </div>
                <p className="mt-2 text-base md:text-lg font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
              {index < stats.length - 1 && (
                <div className="hidden sm:block w-px h-20 bg-black/20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiddleHeroHome;