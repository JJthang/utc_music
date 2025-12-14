import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores";

export const UpgradeButton = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {user?.isPremium ? (
        <div />
      ) : (
        <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full font-semibold text-sm transition-all cursor-pointer">
          <Link to="upgrade/subscription">Nâng cấp tài khoản</Link>
        </button>
      )}
    </>
  );
};
