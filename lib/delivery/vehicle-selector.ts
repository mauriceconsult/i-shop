// lib/delivery/vehicle-selector.ts

import {
  availableVehicles,
  VEHICLE_TIERS,
  VehicleType,
} from "../providers/custom";

export interface VehicleOption {
  type: VehicleType;
  label: string;
  icon: string;
  cost: number; // UGX
  estimatedMinutes: number;
  available: boolean;
  unavailableReason?: string;
}

export function getVehicleOptions(km: number): VehicleOption[] {
  const available = new Set(availableVehicles(km));

  const ALL: { type: VehicleType; label: string; icon: string }[] = [
    { type: "bicycle", label: "Bicycle", icon: "🚲" },
    { type: "motorcycle", label: "Motorcycle / Boda", icon: "🏍️" },
    { type: "car", label: "Car / Van", icon: "🚗" },
  ];

  return ALL.map(({ type, label, icon }) => {
    const tier = VEHICLE_TIERS[type];
    const isAvailable = available.has(type);
    return {
      type,
      label,
      icon,
      cost: isAvailable ? Math.round(tier.baseFare + km * tier.perKm) : 0,
      estimatedMinutes: isAvailable
        ? Math.round((km / tier.speedKmh) * 60 + 5)
        : 0,
      available: isAvailable,
      unavailableReason: !isAvailable
        ? `Only available up to ${tier.maxKm} km (your order is ${km.toFixed(1)} km)`
        : undefined,
    };
  });
}
