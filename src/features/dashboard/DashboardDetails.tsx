import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSearchParams } from "react-router";

import { useApartments } from "../apartments/useApartments";
import { useGetRecentBookings } from "./useGetRecentBookings.ts";

import {
  getRevenueData,
  getStatusData,
  getOccupancy,
  getRevenueByApartment,
  getNightsData,
} from "./dashboardHelpers.js";

import { formatCurrency } from "../../utils/helpers.ts";
import Spinner from "../../ui/Spinner";
import ChartCard from "../../ui/ChartCard";
import StatCard from "../../ui/StatCard";
import { useEffect } from "react";

function DashboardDetails() {
  // generics already declared so no need for type annotation
  const { recentBookings, isLoading } = useGetRecentBookings();

  const { apartments, isLoading: isLoadingApartments } = useApartments();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(
    function () {
      if (!searchParams.get("range")) {
        searchParams.set("range", "all-time");
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams]
  );

  if (isLoading || isLoadingApartments || !apartments || !recentBookings)
    return <Spinner />;

  // if there is not recent bookings
  if (recentBookings.length === 0)
    return (
      <p className="text-2xl text-center pt-10">
        No bookings found for the selected range.
      </p>
    );

  /// REVENUE DATA ///
  const revenueData = getRevenueData(recentBookings);
  const totalRevenue = revenueData?.reduce((acc, cur) => acc + cur.revenue, 0);

  /// STATUS DATA ///
  const statusData = getStatusData(recentBookings);

  /// avg nights stat
  const avgNights = (
    recentBookings.reduce((acc, cur) => acc + cur.numNights, 0) /
    recentBookings.length
  ).toFixed(2);

  /// OCCUPANCY ///
  // TS does not check useEffect and therefore we need this fallback
  const occupancy: string = getOccupancy(
    searchParams.get("range") ?? "all-time",
    recentBookings,
    apartments ?? []
  );

  /// REVENUE BY APARTMENT ///
  const revenueByApartment = getRevenueByApartment(recentBookings);

  /// LENGTH OF STAY CHART ///
  const nightsData = getNightsData(recentBookings);

  return (
    <div className="space-y-10">
      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Bookings" value={String(recentBookings.length)} />
        <StatCard
          title="Revenue"
          value={`${totalRevenue && formatCurrency(totalRevenue)}`}
        />
        <StatCard title="Avg. nights" value={avgNights} />
        <StatCard title="Occupancy" value={`${occupancy}%`} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-8">
        {/* Revenue over time */}
        {revenueData && (
          <ChartCard title="Revenue over time" recentBookings={recentBookings}>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {/* Booking status */}
        <ChartCard title="Bookings by status" recentBookings={recentBookings}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/*Length of stay*/}
        <ChartCard title="Length of stay" recentBookings={recentBookings}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={nightsData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Bar dataKey="nights" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/*Revenue by apartment*/}
        <ChartCard title="Revenue by apartment" recentBookings={recentBookings}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByApartment}>
              <XAxis dataKey="apartment" />
              <YAxis />
              <Tooltip />
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

export default DashboardDetails;
