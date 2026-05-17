// lib/delivery/providers/custom.ts (Vendly)

import type {
  DeliveryProvider,
  DeliveryQuoteRequest,
  DeliveryQuoteResponse,
  CreateDeliveryRequest,
  CreateDeliveryResponse,
} from "@/lib/delivery/types";

function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const BASE_FARE = 3_000;
const PER_KM = 1_200;

const ZURIA_URL = process.env.ZURIA_API_URL ?? "http://localhost:4000";
const PLATFORM_API_KEY = process.env.PLATFORM_API_KEY ?? "";

export const customProvider: DeliveryProvider = {
  name: "custom",

  async getQuote(req: DeliveryQuoteRequest): Promise<DeliveryQuoteResponse> {
    const km = haversineKm(
      req.origin.lat,
      req.origin.lng,
      req.destination.lat,
      req.destination.lng,
    );
    return {
      quoteId: `custom_quote_${Date.now()}`,
      provider: "custom",
      cost: Math.round(BASE_FARE + km * PER_KM),
      currency: "UGX",
      estimatedMinutes: Math.round(10 + km * 4),
      expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
    };
  },

  async createJob(req: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
    // Delegate to Zuria — it owns the DB
    const res = await fetch(`${ZURIA_URL}/api/delivery/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": PLATFORM_API_KEY,
      },
      body: JSON.stringify({
        orderId: req.orderId,
        deliveryCost: 0,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        err.message ?? `Zuria job creation failed: ${res.status}`,
      );
    }

    const job = await res.json();

    return {
      deliveryId: job.id,
      status: "pending",
      provider: "custom",
    };
  },
};
