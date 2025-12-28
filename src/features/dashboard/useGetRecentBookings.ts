import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { formatISO, subDays } from "date-fns";

import { getBookingsAfterDate } from "../../services/apiBookings.ts";
import type { RecentBookings } from "../../types/bookings.ts";

export function useGetRecentBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!searchParams.get("range")) {
    searchParams.set("range", "all-time");
    setSearchParams(searchParams);
  }

  let queryDate;
  if (searchParams.get("range") === "all-time") {
    queryDate = formatISO(new Date(0));
  } else {
    const numDays = searchParams.get("range")
      ? Number(searchParams.get("range"))
      : 7;
    queryDate = subDays(new Date(), numDays).toISOString();
  }

  const { data: recentBookings, isLoading } = useQuery<RecentBookings[], Error>(
    {
      queryFn: () => getBookingsAfterDate(queryDate),
      queryKey: ["bookings", searchParams.get("range")],
    }
  );

  return { recentBookings, isLoading };
}
