import DashboardDetails from "../features/dashboard/DashboardDetails";
import DashboardFilter from "../features/dashboard/DashboardFilter";

function Dashboard() {
  return (
    <div className="pt-5">
      <div className="flex justify-between pb-5">
        <h3 className="text-3xl font-semibold">Dashboard</h3>
        <DashboardFilter />
      </div>
      <DashboardDetails />
    </div>
  );
}

export default Dashboard;
