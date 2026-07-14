import Image from "next/image";
import Link from "next/link";
import TrainingData from "@/data/TrainingData";


const GridTrainings = () => {
  return (
    <section className="relative py-20 w-full overflow-hidden bg-black">
      <div className="relative flex items-center">
        {/* αριθμός */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-20 pt-100">
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
          {TrainingData.map((item) => (
            <div key={item.id} className="bg-zinc-900 p-6 rounded-lg text-center border border-zinc-800 hover:border-[#DAEC40] transition-colors w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
              <h3 className="text-xl font-bold text-white uppercase">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridTrainings;
