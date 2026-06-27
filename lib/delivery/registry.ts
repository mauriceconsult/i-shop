import { customProvider } from "../providers/custom";
import { mockProvider } from "./mock";
import type { DeliveryProvider } from "./types";

export function getDeliveryProvider(): DeliveryProvider {
  const name = process.env.DELIVERY_PROVIDER ?? "mock";

  switch (name) {
    case "custom":      return customProvider;      // Vendly's own rider network
    case "mock":        return mockProvider;        // local dev + CI
    default:
      console.warn(`[delivery] Unknown provider "${name}", falling back to mock`);
      return mockProvider;
  }
}
