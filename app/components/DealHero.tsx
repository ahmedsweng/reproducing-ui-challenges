import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function DealHero() {
  return (
    <div className="relative bg-[#1d2939] w-full flex flex-col justify-end gap-y-5 items-center font-semibold min-h-[45vh]">
      <Image
        alt=""
        src={"/Line-pattern.png"}
        fill
        className="object-cover object-center absolute top-0 left-0"
        loading="lazy"
      />
      <div className="flex-1 flex flex-col items-start justify-end pb-16 w-[90%] lg:w-[80%] gap-y-6">
        <Link
          href="/"
          className="cursor-pointer flex flex-row items-center gap-x-1 text-lg text-white z-10"
        >
          <ChevronLeft size={25} />
          <p className="uppercase text-xl font-bold">All Deals</p>
        </Link>
        <h1 className="text-3xl lg:text-5xl z-10 text-white text-center">
          Reserve your seat
        </h1>
      </div>
    </div>
  );
}

export default DealHero;
