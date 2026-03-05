"use client";

import { useSyncExternalStore } from "react";

interface CurrencyProps {
  value?: string | number;
  currency?: string;
}

interface CurrencyProps {
  value?: string | number;
}

const emptySubscribe = () => () => {};

const Currency: React.FC<CurrencyProps> = ({ value, currency = "USD" }) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!isMounted) return null;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;
