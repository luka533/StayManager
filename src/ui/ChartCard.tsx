import type { RecentBookings } from "../types/bookings";

interface ChartCardProps {
  title: string;
  recentBookings: RecentBookings[];
  children: React.ReactNode;
}

function ChartCard({ title, recentBookings, children }: ChartCardProps) {
  if (recentBookings.length === 0) return <h5>No data yet</h5>;

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default ChartCard;
