import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function FlightCard({
  flightDetails,
  toPage = true,
}: {
  flightDetails: FlattenedFlightDeal;
  toPage?: boolean;
}) {
  const departureDate = new Date(flightDetails.DepartureTime);
  const arriveDate = new Date(flightDetails.ArrivalTime);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // "Fri"
    year: "numeric", // "2024"
    month: "short", // "Feb"
    day: "numeric", // "23"
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // "9:15 AM"
  };

  const formattedDepartureDate = departureDate.toLocaleDateString(
    "en-US",
    options
  );
  const formattedDepartureTime = departureDate.toLocaleTimeString(
    "en-US",
    timeOptions
  );

  const formattedArrivalDate = arriveDate.toLocaleDateString("en-US", options);
  const formattedArrivalTime = arriveDate.toLocaleTimeString(
    "en-US",
    timeOptions
  );

  const formattedDepartureDateTime = `${formattedDepartureDate} at ${formattedDepartureTime}`;
  const formattedArrivalDateTime = `${formattedArrivalDate} at ${formattedArrivalTime}`;

  const formattedHeaderDate = `${
    new Date(flightDetails.DepartureTime).getHours() % 12 || 12
  }:${String(new Date(flightDetails.DepartureTime).getMinutes()).padStart(
    2,
    "0"
  )}${new Date(flightDetails.DepartureTime).getHours() >= 12 ? "PM" : "AM"} (${
    new Date(flightDetails.DepartureTime)
      .toLocaleTimeString("en-US", { timeZoneName: "short" })
      .split(" ")[2]
  }) • ${new Date(flightDetails.DepartureTime).getDate()} ${
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][new Date(flightDetails.DepartureTime).getMonth()]
  }`;

  const totalTime = `${Math.floor(
    parseInt(flightDetails.TotalTravelTimeMinutes) / 60
  )}h ${parseInt(flightDetails.TotalTravelTimeMinutes) % 60}m`;

  // console.log(formattedDepartureDateTime); // Outputs: "Fri, Feb 23, 2024 at 9:15 AM"
  // console.log(formattedArrivalDateTime); // Outputs: "Fri, Feb 23, 2024 at 12:15 PM"

  // Replace the static avatar URL with a dynamic one, if available
  const avatarUrl = "https://via.placeholder.com/150"; // Default URL for the airline logo
  const airlineName = "Airline"; // Default airline name

  const retailPrice = flightDetails.CostBelowAverage + flightDetails.CostFloat;
  const dealCost = flightDetails.CostFloat;

  const percentageOFF = Math.floor(
    ((retailPrice - dealCost) * 100) / retailPrice
  );

  // console.log(retailPrice, dealCost, percentageOFF);

  return (
    <div className="rounded-2xl border border-black/15 w-full max-w-[420px] flex flex-col items-center">
      <div className="relative flex flex-row gap-x-3 items-center flex-1 p-5 bg-[#081437] rounded-t-2xl w-full overflow-hidden">
        <Image
          alt=""
          src={"/Line-pattern.png"}
          fill
          className="object-cover transform scale-[3.0] -translate-y-10"
        />
        <Avatar>
          <AvatarImage src={"UA.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-y-1">
          <p className=" text-[#D0D5DD] text-lg font-semibold">
            {flightDetails.TravelClass} {flightDetails.IsDirect && "• Non-Stop"}
          </p>
          <p className=" text-white text-xl font-bold">{formattedHeaderDate}</p>
        </div>
      </div>
      <div className="flex flex-col w-full px-7 py-4 gap-y-4">
        <div className="flex flex-row items-center gap-x-4 justify-between">
          <div>
            <p className="font-bold text-lg">{flightDetails.OriginCityName}</p>
            <p className="font-bold text-3xl">{flightDetails.Origin}</p>
          </div>
          <ArrowRight size={25} strokeWidth={2} color="#98A2B3" />
          <div>
            <p className="font-bold text-lg">
              {flightDetails.DestinationCityName}
            </p>
            <p className="font-bold text-3xl">{flightDetails.Destination}</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black/15" />
        <div className="flex flex-col items-start gap-y-2">
          <div className="flex flex-col items-start gap-1">
            <p className="font-semibold text-[#475467]">Departs:</p>
            <p className="text-[#1D2939]">{formattedDepartureDateTime}</p>
          </div>
          <div>
            <p className="font-semibold text-[#475467]">Arrives:</p>
            <p className="text-[#1D2939]">
              {formattedArrivalDateTime}{" "}
              <span className="text-gray-400">({totalTime})</span>
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black/15" />
        <div className="flex flex-row justify-between gap-x-3">
          <div className="rounded-lg flex-1 flex flex-col items-start text-center">
            <div className="text-[#FE7D14] flex flex-row items-center justify-center font-bold rounded-t-lg p-1">
              <Image
                alt=""
                src={"/FF LogomarkBlack.svg"}
                width={25}
                height={25}
              />
              {/* <p className="text-[#475467] mx-[2px]">FlyFlat:</p> */}
              <p className="bg-[#FF943D]/20 p-1 whitespace-nowrap rounded-lg">
                {percentageOFF}% OFF
              </p>
            </div>
            <div className="text-3xl flex flex-row items-center gap-x-2 text-[#98A2B3] p-1">
              ${" "}
              <span className="text-[#1D2939] font-bold text-4xl">
                {parseInt(flightDetails.Cost.replace("$", "")).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start flex-1 justify-around">
            <p className="text-[#98A2B3] font-semibold">Retail:</p>
            <p className="text-3xl flex flex-row items-center gap-x-2 text-[#98A2B3]">
              ${" "}
              <span className="text-[#98A2B3] text-4xl line-through font-semibold">
                {Math.floor(
                  flightDetails.CostFloat + flightDetails.CostBelowAverage
                ).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black/15" />
        {toPage ? (
          <>
            <Link
              href={`/deals/${flightDetails.PurchasingId}`}
              className="w-full text-center rounded-lg p-3 bg-[#FF943D] text-white font-semibold"
            >
              See Details
            </Link>
            <div className="w-full h-[1px] bg-black/15" />
          </>
        ) : null}
        <p className="text-center text-[#475467] text-lg">2 seats left</p>
      </div>
    </div>
  );
}

export default FlightCard;
