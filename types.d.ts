type FlattenedFlightDeal = {
  DealId: string;
  TravelClass: string;
  Origin: string;
  OriginAirportName: string;
  OriginCityName: string;
  OriginCountry: string;
  OriginTimeZone: string;
  Destination: string;
  DestinationAirportName: string;
  DestinationCityName: string;
  DestinationCountry: string;
  DestinationTimeZone: string;
  IsDirect: boolean;
  DepartureTime: string;
  ArrivalTime: string;
  flightNumbers: string[];
  BaggageAmount: string;
  BaggageType: string;
  TotalTravelTimeMinutes: string;
  Cost: string;
  CostFloat: number;
  PurchasingId: string;
  connections: string[];
  Segments: FlightSegment[];
  CostBelowAverage: number;
  PercentBelowAverage: number;
};

type FlightSegment = {
  Origin: string;
  Destination: string;
  DepartureTime: string;
  ArrivalTime: string;
  FlightNumber: string;
};
