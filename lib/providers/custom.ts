// lib/delivery/providers/custom.ts

import type {
  DeliveryProvider,
  DeliveryQuoteRequest,
  DeliveryQuoteResponse,
  CreateDeliveryRequest,
  CreateDeliveryResponse,
} from "@/lib/delivery/types";

export type VehicleType = "bicycle" | "motorcycle" | "car";

interface VehicleTier {
  baseFare: number;
  perKm: number;
  maxKm: number | null;
  speedKmh: number;
}

export const VEHICLE_TIERS: Record<VehicleType, VehicleTier> = {
  bicycle: { baseFare: 2_000, perKm: 800, maxKm: 3, speedKmh: 15 },
  motorcycle: { baseFare: 3_000, perKm: 1_200, maxKm: 8, speedKmh: 35 },
  car: { baseFare: 5_000, perKm: 2_000, maxKm: null, speedKmh: 25 },
};

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

export function availableVehicles(km: number): VehicleType[] {
  return (Object.entries(VEHICLE_TIERS) as [VehicleType, VehicleTier][])
    .filter(([, tier]) => tier.maxKm === null || km <= tier.maxKm)
    .sort(
      ([, a], [, b]) => a.baseFare + km * a.perKm - (b.baseFare + km * b.perKm),
    )
    .map(([type]) => type);
}

function quoteForVehicle(km: number, vehicleType: VehicleType) {
  const tier = VEHICLE_TIERS[vehicleType];

  if (tier.maxKm !== null && km > tier.maxKm) {
    const available = availableVehicles(km).join(", ") || "none";
    throw new Error(
      `${vehicleType} is not available for ${km.toFixed(1)} km ` +
        `(max ${tier.maxKm} km). Available: ${available}.`,
    );
  }

  return {
    cost: Math.round(tier.baseFare + km * tier.perKm),
    estimatedMinutes: Math.round((km / tier.speedKmh) * 60 + 5),
  };
}

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

    // vehicleType is now a typed optional field on DeliveryQuoteRequest
    const vehicleType: VehicleType = req.vehicleType ?? "motorcycle";
    const { cost, estimatedMinutes } = quoteForVehicle(km, vehicleType);

    return {
      quoteId: `custom_quote_${Date.now()}`,
      provider: "custom",
      cost,
      currency: "UGX",
      estimatedMinutes,
      expiresAt: new Date(Date.now() + 15 * 60_000).toISOString(),
      distanceKm: parseFloat(km.toFixed(2)),
      vehicleType,
      maxKm: VEHICLE_TIERS[vehicleType].maxKm,
    };
  },

  async createJob(req: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
    // vehicleType is now a typed optional field on CreateDeliveryRequest
    const vehicleType: VehicleType = req.vehicleType ?? "motorcycle";

    const res = await fetch(`${ZURIA_URL}/api/delivery/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": PLATFORM_API_KEY,
      },
      body: JSON.stringify({
        orderId: req.orderId,
        deliveryCost: 0,
        vehicleType,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        err.message ?? `Zuria job creation failed: ${res.status}`,
      );
    }

    const job = await res.json();
    return { deliveryId: job.id, status: "pending", provider: "custom" };
  },
};
