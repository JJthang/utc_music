import { SERVER_MESSAGES, VNPAY_CODES } from "@/constants/payment";
import type { FC } from "react";
import { Link } from "react-router-dom";

interface PaymentResultProps {
  status: string | null;
  orderId: string | null;
  responseCode: string | null;
  message: string | null;
}

const getPaymentDetails = (
  status: string | null,
  orderId: string | null,
  responseCode: string | null,
  message: string | null
) => {
  let title,
    detail,
    icon,
    iconClass,
    showDetails = false;

  switch (status) {
    case "success":
      title = "Thanh toán thành công!";
      detail = `Đơn hàng **${orderId}** của bạn đã được xử lý. Gói dịch vụ đã được kích hoạt.`;
      icon = "success";
      iconClass = "text-green-500";
      showDetails = true;
      break;

    case "failed":
      title = "Thanh toán thất bại.";
      detail = `Giao dịch VNPAY cho đơn hàng **${orderId}** không thành công. Mã lỗi (${responseCode}): ${
        (responseCode ? VNPAY_CODES[responseCode as keyof typeof VNPAY_CODES] : undefined) ||
        "Lỗi không xác định từ VNPAY."
      }`;
      icon = "failure";
      iconClass = "text-red-500";
      showDetails = true;
      break;

    case "error":
      title = "Lỗi hệ thống.";
      if (message) {
        const serverMsg = Object.prototype.hasOwnProperty.call(
          SERVER_MESSAGES,
          message
        )
          ? SERVER_MESSAGES[message as keyof typeof SERVER_MESSAGES]
          : `Lỗi không xác định: ${message}`;

        detail = `Xử lý đơn hàng gặp lỗi: **${serverMsg}**. Vui lòng liên hệ hỗ trợ.`;
      } else {
        detail =
          "Đã xảy ra lỗi không xác định trong quá trình xử lý thanh toán. Vui lòng thử lại sau.";
      }

      icon = "failure";
      iconClass = "text-red-500";
      showDetails = !!orderId;
      break;

    default:
      title = "Trạng thái giao dịch không hợp lệ.";
      detail = "Vui lòng kiểm tra lại đường dẫn URL hoặc quay về trang chủ.";
      icon = "failure";
      iconClass = "text-red-500";
      break;
  }

  return { title, detail, icon, iconClass, showDetails };
};

const StatusIcon = ({ icon }: { icon: string }) => {
  if (icon === "success") {
    return (
      <svg
        className="w-16 h-16 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    );
  }
  return (
    <svg
      className="w-16 h-16 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );
};

const PaymentResult: FC<PaymentResultProps> = ({
  status,
  orderId,
  responseCode,
  message,
}) => {
  const { title, detail, icon, iconClass, showDetails } = getPaymentDetails(
    status,
    orderId,
    responseCode,
    message
  );

  return (
    <div className="bg-outlet text-white p-6 md:p-8">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Thông tin giao dịch
        </h1>
        <div className="max-w-lg w-full bg-gray-800 rounded-xl p-8 shadow-2xl text-center">
          <div className="mb-6 flex justify-center">
            <StatusIcon icon={icon} />
          </div>
          <h1 className={`text-3xl font-bold mb-3 ${iconClass}`}>{title}</h1>
          <p
            className="text-gray-300 mb-8 max-w-md mx-auto"
            dangerouslySetInnerHTML={{ __html: detail }}
          />
          {showDetails && orderId && (
            <div className="bg-gray-700 p-4 rounded-lg mb-8 text-left">
              <h2 className="text-white text-lg font-semibold mb-3">
                Thông tin Đơn hàng
              </h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-400">Mã đơn hàng:</span>
                <span className="text-white text-right font-medium break-all">
                  {orderId}
                </span>
                {status === "failed" && responseCode && (
                  <>
                    <span className="text-gray-400">Mã lỗi VNPAY:</span>
                    <span className="text-white text-right font-medium">
                      {responseCode}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
          {status === "success" && (
            <button
              className={`w-full bg-green-600 hover:bg-green-700text-white font-bold py-3 rounded-full transition duration-300 uppercase shadow-lg cursor-pointer`}
            >
              <Link to="/">Trải nghiệm ngay</Link>
            </button>
          )}

          <button className="w-full mt-4 text-gray-400 hover:text-white hover:underline transition duration-200 text-sm cursor-pointer">
            <Link to="/">Quay lại trang chủ</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
