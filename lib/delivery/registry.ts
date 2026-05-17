// lib/delivery/registry.ts

import { customProvider } from "../providers/custom";
import { safebodaProvider } from "../providers/safeboda";
import { uberDirectProvider } from "../providers/uber-direct";
import { mockProvider } from "./mock";
import type { DeliveryProvider } from "./types";

export function getDeliveryProvider(): DeliveryProvider {
  const name = process.env.DELIVERY_PROVIDER ?? "mock";

  switch (name) {
    case "uber_direct": return uberDirectProvider;  // pending Uber Direct approval
    case "safeboda":    return safebodaProvider;    // live once credentials arrive (~2hrs)
    case "custom":      return customProvider;      // Vendly's own rider network
    case "mock":        return mockProvider;        // local dev + CI
    default:
      console.warn(`[delivery] Unknown provider "${name}", falling back to mock`);
      return mockProvider;
  }
}
