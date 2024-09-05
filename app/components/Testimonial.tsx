import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import Image from "next/image";

function Testimonial() {
  return (
    <div className="w-full flex flex-col items-center border border-black/15 bg-[#F9FAFB] py-10 gap-y-10">
      <div className="w-full border border-black/15 divide-y-2 lg:divide-x-2 lg:divide-y-0 divide-black/15 px-5 lg:px-40 flex flex-col lg:flex-row justify-center">
        <div className="flex lg:flex-row gap-x-3 items-center p-5">
          <Avatar>
            <AvatarImage src="/gentleman.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-y-1">
            <p className=" text-black font-semibold">Michael Goodman</p>
            <p className=" text-[#475467]">Co-Founder, Oshi Health</p>
          </div>
        </div>
        <div className="p-5 lg:w-[50%] flex flex-row gap-x-2 items-center">
          <Quote className="transform rotate-180" size={100} color="gray" />
          <p className="font-light italic">
            We needed to get to Switzerland for an important presentation and
            were seeing $20k round-trip business class flights, but managed to
            get them for us for just $4k.
          </p>
        </div>
        <div className="p-5 flex flex-row justify-start items-center">
          <Image alt="" src={"/TP.svg"} width={150} height={40} />
        </div>
      </div>
      <div />
    </div>
  );
}

export default Testimonial;
