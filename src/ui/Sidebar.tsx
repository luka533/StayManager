import { NavLink } from "react-router";

function Sidebar() {
  return (
    <div className=" border-r-stone-200 text-center h-full w-40 bg-stone-50 border-r border-stone-200">
      <NavLink
        className={({ isActive }) =>
          `block py-4 hover:bg-stone-200 ${
            isActive ? "bg-stone-200 font-semibold" : ""
          }`
        }
        to="/"
      >
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block py-4 hover:bg-stone-200 ${
            isActive ? "bg-stone-200 font-semibold" : ""
          }`
        }
        to="/apartments"
      >
        Apartments
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block py-4 hover:bg-stone-200 ${
            isActive ? "bg-stone-200 font-semibold" : ""
          }`
        }
        to="/bookings"
      >
        Bookings
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block py-4 hover:bg-stone-200 ${
            isActive ? "bg-stone-200 font-semibold" : ""
          }`
        }
        to="/settings"
      >
        settings
      </NavLink>
    </div>
  );
}

export default Sidebar;
