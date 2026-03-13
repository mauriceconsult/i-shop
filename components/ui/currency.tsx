// i-shop/components/ui/currency.tsx
"use client";

import { useSyncExternalStore } from "react";
import { useCurrency } from "@/context/currency-context";

const emptySubscribe = () => () => {};

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const { currency, locale } = useCurrency();

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!isMounted) return null;

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });

  return (
    <span className="font-semibold">{formatter.format(Number(value))}</span>
  ); // ← span not div
};

export default Currency;
