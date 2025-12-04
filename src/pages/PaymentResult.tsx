import PaymentResult from "@/features/UpgradeSubscription/PaymentResult";
import { useSearchParams } from "react-router-dom";

const PaymentResultPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");
  const responseCode = searchParams.get("code");
  const message = searchParams.get("message");
  return (
    <PaymentResult
      status={status}
      orderId={orderId}
      responseCode={responseCode}
      message={message}
    />
  );
};

export default PaymentResultPage;
