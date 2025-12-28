import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-auto max-w-375 mx-auto px-10 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
