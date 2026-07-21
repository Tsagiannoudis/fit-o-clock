import Image from "next/image";
import Link from "next/link";
import TrainingData from "@/data/TrainingData";
import { HiArrowRight } from "react-icons/hi";


const GridTrainings = () => {
  return (
    <section className="relative py-20 w-full overflow-hidden bg-black">
      <div className="relative flex items-center">
        {/* αριθμός */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-20 pt-300">
          <div className="w-px h-40 bg-white/25" />
          <span className="my-5 text-[#DAEC40] font-bold tracking-widest text-lg">
            02
          </span>
          <div className="w-px h-40 bg-white/25" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-2xl text-[#DAEC40] tracking-tighter drop-shadow-2xl mb-2 uppercase">
            Προγράμματα
          </h1>
          <p className="text-5xl uppercase font-bold leading-tight text-white ">
            Προγραμματα για κάθε στόχο
          </p>
          <div className="w-24 h-1 bg-[#DAEC40] mx-auto mt-4 mb-6"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-wrap justify-center gap-8">
          {TrainingData.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative flex items-center gap-4 bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-[#DAEC40] transition-colors md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-3/6 z-10">
                <Image
                  src={item.shortLogo}
                  alt={`${item.title} logo`}
                  width={80}
                  height={60}
                  className="mb-3 border border-[#DAEC40] rounded-full"
                />
                <h3 className="text-[20px] font-bold text-white uppercase">{item.title}</h3>
                <p className="mt-2 text-gray-400">{item.smallDescription}</p>
                <Link
                  href={`/trainings/${item.id}`}
                  className="mt-4 inline-block text-[#DAEC40] group-hover:text-black group-hover:bg-[#DAEC40] transition-colors p-2 rounded-full border border-[#DAEC40]"
                >
                  <HiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="absolute right-0 top-0 h-full w-2/5 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <Image 
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 40vw, 15vw"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridTrainings;
