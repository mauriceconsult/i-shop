// i-shop/lib/platform.ts (storefront)
export const PLATFORM_FEE_PERCENT = 10;

export const calculateFees = (subtotal: number, deliveryCost: number) => {
  const platformFee = Math.round((subtotal * PLATFORM_FEE_PERCENT) / 100);
  const grandTotal = subtotal + deliveryCost + platformFee;
  return { platformFee, grandTotal };
};
