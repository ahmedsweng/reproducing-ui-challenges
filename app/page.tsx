import DealHero from "./components/DealHero";
import PaymentForm from "./components/PaymentForm";
import Testimonial from "./components/Testimonial";

// Mock data for the flight details
const flightDetails: FlattenedFlightDeal = {
  DealId: "2024-09-02-LH1234",
  TravelClass: "Economy",
  Origin: "LAX",
  OriginAirportName: "MMM",
  OriginCountry: "USA",
  OriginTimeZone: "America",
  OriginCityName: "Los Angeles",
  Destination: "JFK",
  DestinationAirportName: "YYY",
  DestinationCountry: "USA",
  DestinationTimeZone: "America",
  DestinationCityName: "New York",
  IsDirect: true,
  DepartureTime: "2024-09-15T14:30:00",
  ArrivalTime: "2024-09-15T22:00:00",
  TotalTravelTimeMinutes: "450",
  flightNumbers: ["LH1234"],
  BaggageAmount: "23",
  BaggageType: "Kilograms",
  Cost: "$299.99",
  CostFloat: 299.99,
  PurchasingId: "20240915_LAX_JFK_Economy_LH1234",
  connections: [],
  Segments: [],
  CostBelowAverage: 100.0,
  PercentBelowAverage: 15,
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <DealHero />
      <PaymentForm deal={flightDetails} />
      <Testimonial />
    </main>
  );
}
