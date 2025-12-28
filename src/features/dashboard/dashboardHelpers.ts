import { format } from "date-fns";

import type { RecentBookings, RevenueItem } from "../../types/bookings";
import type { Apartments } from "../../types/apartments";

// without record generic ts does not know wheter acc (of the reduce) has string keys and RevenueItem values
export function getRevenueData(
  recentBookings: RecentBookings[]
): RevenueItem[] | null {
  return Object.values(
    recentBookings.reduce<Record<string, RevenueItem>>((acc, b) => {
      const date = format(new Date(b.created_at), "dd MMM yyyy");

      if (!acc[date]) acc[date] = { date, revenue: 0 };

      acc[date].revenue += b.totalPrice;

      return acc;
    }, {})
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getStatusData(recentBookings: RecentBookings[]) {
  return [
    {
      status: "Checked-in",
      value: recentBookings.reduce((acc, cur) => {
        if (cur.status === "checked-in") return acc + 1;
        else return acc + 0;
      }, 0),
    },
    {
      status: "Checked-out",
      value: recentBookings.reduce((acc, cur) => {
        if (cur.status === "checked-out") return acc + 1;
        else return acc + 0;
      }, 0),
    },
    {
      status: "Unconfirmed",
      value: recentBookings.reduce((acc, cur) => {
        if (cur.status === "unconfirmed") return acc + 1;
        else return acc + 0;
      }, 0),
    },
  ];
}

// Occupancy rate is just the percantage of filled rooms over a period of nights
// if numdays is all time then we get the first booking convert it into ms (dates are usually defined by ms) then subtract it against today and get the rounded up number
export function getOccupancy(
  range: string,
  recentBookings: RecentBookings[],
  apartments: Apartments[]
): string {
  const numDays =
    range === "all-time"
      ? Math.ceil(
          (new Date().getTime() -
            Math.min(
              ...recentBookings.map((b) => new Date(b.created_at).getTime())
            )) /
            (1000 * 60 * 60 * 24)
        )
      : Number(range);

  const bookedNights = recentBookings.reduce((acc, b) => acc + b.numNights, 0);
  const occupancy = (
    (bookedNights / (apartments.length * numDays)) *
    100
  ).toFixed(2);

  return occupancy;
}

type RevenueByApartmentItem = {
  apartment: string;
  revenue: number;
};

// need generics again because ts does not know which key value pairs acc in reduce has
export function getRevenueByApartment(recentBookings: RecentBookings[]) {
  return Object.values(
    recentBookings.reduce<Record<string, RevenueByApartmentItem>>((acc, b) => {
      // b.apartments[0].name is correct according to the type but throws an error

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const apt = b.apartments.name || "Unknown";

      if (!acc[apt]) acc[apt] = { apartment: apt, revenue: 0 };
      acc[apt].revenue += b.totalPrice;

      return acc;
    }, {})
  );
}

export function getNightsData(recentBookings: RecentBookings[]) {
  return [
    {
      label: "1–2 nights",
      nights: recentBookings.filter((b) => b.numNights <= 2).length,
    },
    {
      label: "3–4 nights",
      nights: recentBookings.filter((b) => b.numNights >= 3 && b.numNights <= 4)
        .length,
    },
    {
      label: "5–7 nights",
      nights: recentBookings.filter((b) => b.numNights >= 5 && b.numNights <= 7)
        .length,
    },
    {
      label: "8+ nights",
      nights: recentBookings.filter((b) => b.numNights >= 8).length,
    },
  ];
}
