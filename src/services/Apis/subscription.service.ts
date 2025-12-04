import api from "../http";
import type { ApiListResponse } from "@/types/api-response.type";
import type { SubscriptionTier } from "@/types/subscriptions";

const paymentUrl = `${import.meta.env.VITE_API_URL}/api/payment`;

interface GetSubscriptionTiersParams {
  includeFree?: boolean;
}

interface OrderPaymentPayload {
  tierId: string;
  paymentMethod: string;
}

export const getAllSubscriptionTiers = async (
  params: GetSubscriptionTiersParams = {}
): Promise<ApiListResponse<SubscriptionTier>> => {
  const { includeFree = true } = params;

  const result = await api.get(`${paymentUrl}/tiers`, {
    params: { includeFree },
  });

  return result.data;
};

export const createOrderPayment = async (payload: OrderPaymentPayload) => {
  const result = await api.post(`${paymentUrl}/create`, payload);
  return result.data;
};
