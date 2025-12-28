import { useNavigate } from "react-router";
import { useUser } from "../features/auth/useUser.ts";
import { useLogout } from "../features/auth/useLogout.ts";
import SpinnerMini from "./SpinnerMini";

function Header() {
  const { user, isLoading: isLoadingUser } = useUser();
  const { logout, isLoading } = useLogout();

  const navigate = useNavigate();

  if (isLoadingUser || isLoading) return <SpinnerMini />;

  return (
    <header className="h-[8%] bg-stone-50 border-b-stone-200 border-b content-center flex justify-between items-center px-10">
      <div
        onClick={() => navigate("/")}
        className="h-full flex items-center cursor-pointer hover:scale-104 hover:transition-all"
      >
        <img
          className="h-[50%]"
          src="/stayManager.png"
          alt="StayManager logo"
        />
        <h1 className="text-xl text-stone-500">StayManager</h1>
      </div>
      <div className="h-full flex items-center">
        <h6 className="text-xl pr-50">
          Welcome, {user?.user_metadata?.fullName ?? "Guest"}
        </h6>
        <button
          onClick={() => logout()}
          className="px-6 py-2 border border-emerald-500 text-emerald-500 font-semibold rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;
