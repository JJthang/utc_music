export interface SubscriptionTier {
  id: string;
  name: string;
  plan: SubscriptionPlan;
  price: number;
  duration: number;
  features: string[];
  maxDevices: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  tierId: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
  tier?: SubscriptionTier;
}

export interface Payment {
  id: string;
  userId: string;
  tierId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId: string;
  gatewayOrderId: string | null;
  gatewayResponse: VnpayResponse | null;
  createdAt: string;
  paidAt: string | null;
  failedAt: string | null;
  refundedAt: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  description: string | null;
  tier?: SubscriptionTier;
  userSubscription?: UserSubscription;
}

export interface VnpayResponse {
  vnp_Amount: string;
  vnp_TxnRef: string;
  vnp_PayDate: string;
  vnp_TmnCode: string;
  vnp_BankCode: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_BankTranNo: string;
  vnp_SecureHash: string;
  vnp_ResponseCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
}
export type SubscriptionPlan = "FREE" | "PREMIUM_MONTHLY" | "PREMIUM_YEARLY";

export type SubscriptionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "CANCELLED"
  | "EXPIRED"
  | "PENDING";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type PaymentMethod = "VNPAY" | "MOMO" | "ZALOPAY" | "CASH" | "OTHER";
