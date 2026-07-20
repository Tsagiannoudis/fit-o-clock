import Image from "next/image";
import Link from "next/link";

const HeroSectionHome = () => {
  return (
    <section className="relative min-h-[350px] h-[110vh] md:h-[95vh] w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/heroHome.png"
          alt="HomeSection - Fit-o-clock"
          fill
          objectFit="cover"
          className="scale-100 animate-subtle-zoom transition-transform duration-1000 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/05" />
      </div>

      {/* αριθμός */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-20">
        <div className="w-px h-40 bg-white/25" />
        <span className="my-5 text-[#DAEC40] font-bold tracking-widest text-lg">
          01
        </span>
        <div className="w-px h-40 bg-white/25" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="max-w-[580px] text-white text-center md:text-left"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#DAEC40]/20 backdrop-blur-sm text-[#DAEC40] text-xs font-bold tracking-[0.2em] uppercase mb-4 mx-auto md:mx-0">
            Fitness - Strngth - Wellness
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter drop-shadow-2xl mb-2 uppercase">
            Χτίσε το σώμα που θέλεις.
            <br />
            <span className="text-[#DAEC40]">ξεκίνα σήμερα.</span>
          </h1>

          <div className="mt-4" data-aos="fade-up" data-aos-delay="400">
            <p className="text-lg md:text-lg font-light leading-tight">
              Σύγχρονα προγράμματα εκγύμνασης, διατροφής και ευεξίας για κάθε
              επίπεδο.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-x-4 gap-y-4 justify-center md:justify-start">
            <Link
              href={"/get-started"}
              className={
                "w-full sm:w-auto bg-[#daec40] p-4 text-black hover:bg-[#c4d33a] transition-colors uppercase font-semibold rounded-md"
              }
            >
              δες τα προγράμματα
            </Link>

            <Link
              href={"/get-started"}
              className={
                "w-full sm:w-auto bg-black p-4 border border-[#daec40] text-white hover:bg-[#daec40] hover:text-black transition-colors uppercase font-semibold rounded-md"
              }
            >
              κλείσε προπόνηση
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionHome;
