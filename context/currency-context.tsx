// i-shop/context/currency-context.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface CurrencyContextType {
  currency: string;
  locale: string;
}

const CURRENCY_LOCALE_MAP: Record<string, string> = {
  UGX: "en-UG",
  KES: "en-KE",
  USD: "en-US",
  GBP: "en-GB",
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "UGX",
  locale: "en-UG",
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState("UGX");
  const [locale, setLocale] = useState("en-UG");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}`)
      .then((res) => {
        const cur = res.data.currency ?? "UGX";
        setCurrency(cur);
        setLocale(CURRENCY_LOCALE_MAP[cur] ?? "en-UG");
      })
      .catch(() => {
        setCurrency("UGX");
        setLocale("en-UG");
      });
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, locale }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
