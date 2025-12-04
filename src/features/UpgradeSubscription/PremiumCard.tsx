import { specialPrivileges } from "@/constants";
import { Link } from "react-router-dom";

const PremiumCard = () => {
  return (
    <div className="max-w-sm w-full bg-[#1E293B] border border-blue-700 rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-white mb-2">
          <span>UTC Music</span>
          <span className="bg-white text-[#1E293B] px-2 py-0.5 rounded-lg text-lg font-black tracking-wider">
            PREMIUM
          </span>
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Toàn bộ đặc quyền cho gói cao cấp
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          Chỉ 39.000đ cho 1 tháng
        </h2>

        <button className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-black font-extrabold py-3 rounded-full transition duration-300 shadow-lg uppercase text-lg cursor-pointer">
          <Link to="/upgrade/payment">ĐĂNG KÝ GÓI</Link>
        </button>
      </div>

      <hr className="border-gray-500 mb-6" />

      <div>
        <h3 className="text-white text-lg font-semibold mb-4">
          Đặc quyền đặc biệt:
        </h3>

        <ul className="space-y-3">
          {specialPrivileges.map((privilege, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-500 mr-3 mt-1">
                {/* Icon dấu check V (Tailwind's utility classes) */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
              <span className="text-white text-base">{privilege}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PremiumCard;
