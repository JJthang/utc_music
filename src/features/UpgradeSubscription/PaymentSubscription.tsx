import { useEffect, useState, type FC } from "react";
import type { SubscriptionTier } from "@/types/subscriptions";
import {
  createOrderPayment,
  getAllSubscriptionTiers,
} from "@/services/Apis/subscription.service";
import { specialPrivileges } from "@/constants";
import { formatCurrency } from "@/utils/format";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores";

interface TierItemProps {
  tierInfo: SubscriptionTier;
  isSelected: boolean;
  onSelect: (tier: SubscriptionTier) => void;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("vi-VN");
};

const getSubscriptionDates = (
  duration: number,
  startDate: Date = new Date()
) => {
  const upgradeDate = startDate;

  const endDate = new Date(upgradeDate);
  endDate.setDate(endDate.getDate() + duration);

  const nextBilling = new Date(endDate);

  return {
    upgradeDate: formatDate(upgradeDate),
    endDate: formatDate(endDate),
    nextBilling: formatDate(nextBilling),
  };
};

const PaymentSubscription = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedTier, setSelectedTier] = useState<
    SubscriptionTier | undefined
  >(undefined);

  const [subscriptionTiers, setSubscriptionTiers] = useState<
    SubscriptionTier[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTier(subscriptionTiers[0]);
  }, [subscriptionTiers]);

  const handleSetSelectedTier = (tier: SubscriptionTier) => {
    setSelectedTier(tier);
  };

  useEffect(() => {
    const fetchAllSubscriptionTier = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getAllSubscriptionTiers({ includeFree: false });
        setSubscriptionTiers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSubscriptionTier();
  }, []);

  if (isLoading) {
    return <p>Đang tải danh sách</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Lỗi: {error}</p>;
  }

  const baseClasses =
    "flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all duration-200";
  const selectedClasses = "border border-blue-500 bg-blue-900/50 shadow-lg";
  const unselectedClasses = "border border-transparent hover:bg-gray-800";

  const TierItem: FC<TierItemProps> = ({ tierInfo, isSelected, onSelect }) => {
    return (
      <div
        className={`${baseClasses} ${
          isSelected ? selectedClasses : unselectedClasses
        }`}
        onClick={() => onSelect(tierInfo)}
      >
        <div>
          <p className="text-blue-500 text-base font-semibold mb-1 ml-3">
            {tierInfo.duration === 30 ? "1 Tháng" : "12 Tháng"}
          </p>
          <p className="text-white mb-1 ml-3 text-2xl font-bold">
            {formatCurrency(tierInfo.price)}
          </p>
        </div>

        <div
          className={`w-5 h-5 rounded-full border-2 ${
            isSelected ? "border-blue-500 bg-blue-500" : "border-gray-500"
          }`}
        >
          {isSelected && (
            <div className="w-full h-full rounded-full bg-white scale-75"></div>
          )}
        </div>
      </div>
    );
  };

  const PrivilegeList = () => (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-white text-lg font-bold mb-4">Đặc quyền gói PLUS</h3>
      <ul className="space-y-3">
        {specialPrivileges.map((privilege, index) => (
          <li key={index} className="flex items-start text-white text-base">
            <svg
              className="w-5 h-5 mr-3 mt-0.5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {privilege}
          </li>
        ))}
      </ul>
    </div>
  );

  const PaymentInfo = () => {
    const [selectedMethod, setSelectedMethod] = useState("VNPAY");
    const { upgradeDate, endDate, nextBilling } = getSubscriptionDates(
      selectedTier?.duration || 0
    );

    const handleSetSelectedMethod = (method: string) => {
      setSelectedMethod(method);
    };

    const paymentOrder = async () => {
      try {
        const payload = {
          tierId: selectedTier?.id || "",
          paymentMethod: selectedMethod,
        };
        const result = await createOrderPayment(payload);
        const paymentUrl = result.data.paymentUrl
        window.location.href = paymentUrl
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div className="p-6 bg-gray-800 rounded-lg mb-6">
        <div className="flex items-center mb-6">
          <div className="overflow-hidden w-10 h-10 bg-green-500 rounded-full mr-3 border-2 border-white">
            <img src={user?.avatarUri || ""} alt={user?.userName} className="w-full h-full rounded-full object-cover"/>
          </div>
          <span className="text-white text-lg font-semibold">
            {user?.displayName}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 text-sm mb-6">
          <span className="text-gray-400">Thời điểm nâng cấp</span>
          <span className="text-white text-right">{upgradeDate}</span>

          <span className="text-gray-400">Hiệu lực đến</span>
          <span className="text-white text-right">{endDate}</span>

          <span className="text-gray-400">Kỳ thanh toán tiếp theo</span>
          <span className="text-white text-right">{nextBilling}</span>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-700">
          <p className="text-gray-400 font-bold">Chọn phương thức thanh toán</p>
          <div
            id="VNPAY"
            className={`${baseClasses} ${
              selectedMethod === "VNPAY" ? selectedClasses : unselectedClasses
            }`}
            onClick={() => handleSetSelectedMethod("VNPAY")}
          >
            <div className="flex items-center h-10">
              <img src="/images/vnpay.svg" alt="" className="object-cover" />
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "VNPAY"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-500"
              }`}
            >
              {selectedMethod === "VNPAY" && (
                <div className="w-full h-full rounded-full bg-white scale-75"></div>
              )}
            </div>
          </div>

          <div
            id="ZALOPAY"
            className={`${baseClasses} ${
              selectedMethod === "ZALOPAY" ? selectedClasses : unselectedClasses
            }`}
            onClick={() => handleSetSelectedMethod("ZALOPAY")}
          >
            <div className="flex items-center h-10">
              <img
                src="/images/card_zalopay.svg"
                alt=""
                className="object-cover"
              />
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === "ZALOPAY"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-500"
              }`}
            >
              {selectedMethod === "ZALOPAY" && (
                <div className="w-full h-full rounded-full bg-white scale-75"></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-700">
          <span className="text-gray-400 font-bold">Tổng thanh toán:</span>
          <span className="text-2xl font-extrabold text-white">
            {formatCurrency(selectedTier?.price || 0)}
          </span>
          <div
            onClick={paymentOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 cursor-pointer"
          >
            ĐĂNG KÝ
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold text-white mb-6">
            Chọn gói nâng cấp
          </h2>
          <div className="space-y-4">
            {subscriptionTiers.map((pkg) => (
              <TierItem
                key={pkg.id}
                tierInfo={pkg}
                isSelected={pkg.plan === selectedTier?.plan}
                onSelect={handleSetSelectedTier}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <PaymentInfo />
          <PrivilegeList />
        </div>
      </div>
    </div>
  );
};

export default PaymentSubscription;
