"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { calculateFees } from "@/lib/platform";
import axios from "axios";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DeliveryQuote {
  quoteId:          string;
  provider:         string;
  cost:             number;
  currency:         string;
  estimatedMinutes: number;
  expiresAt:        string;
  destination:      { lat: number; lng: number };
}

// ─── Component ────────────────────────────────────────────────────────────────

const Summary = () => {
  const router  = useRouter();
  const items   = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  // ── Delivery state ─────────────────────────────────────────────────────────
  const [deliveryMethod,   setDeliveryMethod]   = useState("pickup");
  const [deliveryAddress,  setDeliveryAddress]  = useState("");
  const [gpsCoords,        setGpsCoords]        = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading,       setGpsLoading]       = useState(false);
  const [deliveryQuote,    setDeliveryQuote]     = useState<DeliveryQuote | null>(null);
  const [fetchingQuote,    setFetchingQuote]     = useState(false);
  const [quoteError,       setQuoteError]        = useState<string | null>(null);

  // ── Payment state ──────────────────────────────────────────────────────────
  const [phone,            setPhone]            = useState("");
  const [paymentMethod,    setPaymentMethod]    = useState<"stripe" | "momo">("momo");
  const [momoPhone,        setMomoPhone]        = useState("");
  const [pollingStatus,    setPollingStatus]    = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── GPS location ───────────────────────────────────────────────────────────
  const requestGps = () => {
    if (!navigator.geolocation) {
      toast.error("GPS not supported on this device.");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setGpsCoords(coords);
        setGpsLoading(false);
        toast.success("Location detected — enter your address to confirm.");
      },
      () => {
        setGpsLoading(false);
        toast.error("Could not get your location. Please enter your address manually.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // ── Fetch delivery quote (debounced) ────────────────────────────────────────
  useEffect(() => {
    if (deliveryMethod === "pickup" || !deliveryAddress.trim()) {
      setDeliveryQuote(null);
      setQuoteError(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setFetchingQuote(true);
      setQuoteError(null);
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/delivery/quote`,
          {
            address: deliveryAddress,
            coords:  gpsCoords ?? undefined,  // pass GPS if available
          }
        );
        setDeliveryQuote(data);
      } catch (err: unknown) {
        const msg = axios.isAxiosError(err)
          ? err.response?.data?.error ?? "Could not get delivery quote."
          : "Could not get delivery quote.";
        setQuoteError(msg);
        setDeliveryQuote(null);
      } finally {
        setFetchingQuote(false);
      }
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [deliveryAddress, gpsCoords, deliveryMethod]);

  // ── Totals ──────────────────────────────────────────────────────────────────
  const itemsTotal  = items.reduce((t, i) => t + Number(i.price), 0);
  const deliveryCost = deliveryQuote?.cost ?? 0;
  const { platformFee, grandTotal } = calculateFees(itemsTotal, deliveryCost);

  // ── MoMo polling ───────────────────────────────────────────────────────────
  const pollMomoStatus = async (referenceId: string, orderId: string) => {
    setPollingStatus("pending");
    let attempts = 0;
    const maxAttempts = 12;

    const poll = async (): Promise<void> => {
      if (attempts >= maxAttempts) {
        setPollingStatus(null);
        toast.error("Payment timed out. Please try again.");
        return;
      }
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout/momo/status`,
          { params: { referenceId, orderId } }
        );
        if (data.status === "SUCCESSFUL") {
          setPollingStatus(null);
          toast.success("Payment completed.");
          removeAll();
          router.push("/cart?success=1");
          return;
        }
        if (data.status === "FAILED") {
          setPollingStatus(null);
          toast.error("Payment failed. Please try again.");
          return;
        }
        attempts++;
        await new Promise((r) => setTimeout(r, 10000));
        return poll();
      } catch {
        setPollingStatus(null);
        toast.error("Could not verify payment status.");
      }
    };
    await poll();
  };

  // ── Checkout ────────────────────────────────────────────────────────────────
  const onCheckout = async () => {
    if (deliveryMethod !== "pickup") {
      if (!deliveryAddress.trim()) {
        toast.error("Please enter a delivery address.");
        return;
      }
      if (!deliveryQuote) {
        toast.error("Please wait for a delivery quote.");
        return;
      }
    }
    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    const payload = {
      productIds:      items.map((i) => i.id),
      deliveryMethod,
      deliveryCost,
      deliveryAddress: deliveryMethod !== "pickup" ? deliveryAddress : undefined,
      deliveryLat:     deliveryQuote?.destination.lat,
      deliveryLng:     deliveryQuote?.destination.lng,
      deliveryQuoteId: deliveryQuote?.quoteId,
      deliveryProvider: deliveryQuote?.provider,
      phone,
    };

    if (paymentMethod === "stripe") {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        payload
      );
      window.location = data.url;
    } else {
      if (!momoPhone) {
        toast.error("Please enter your MoMo phone number.");
        return;
      }
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/momo`,
        { ...payload, phone: momoPhone }
      );
      toast.success("Check your phone for a MoMo payment prompt.");
      await pollMomoStatus(data.referenceId, data.orderId);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="mt-16 rounded-md bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-500">Order Summary</h2>

      <div className="mt-6 space-y-4">

        {/* Items Total */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-500">Items Total</div>
          <Currency value={itemsTotal} />
        </div>

        {/* Delivery Method */}
        <div className="border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-500 mb-2">
            Delivery Method
          </div>
          <select
            value={deliveryMethod}
            onChange={(e) => {
              setDeliveryMethod(e.target.value);
              setDeliveryQuote(null);
              setQuoteError(null);
              setGpsCoords(null);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="pickup">Self Pickup — Free</option>
            <option value="standard">Standard Delivery</option>
            <option value="uber_direct">Uber Direct (Door to Door)</option>
          </select>
        </div>

        {/* Delivery Address + GPS */}
        {deliveryMethod !== "pickup" && (
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-base font-medium text-gray-500">
                Delivery Address
              </div>
              {/* GPS button */}
              <button
                type="button"
                onClick={requestGps}
                disabled={gpsLoading}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors"
              >
                {gpsLoading
                  ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  : <Navigation className="h-3.5 w-3.5" />
                }
                {gpsLoading ? "Detecting..." : "Use my location"}
              </button>
            </div>

            {/* GPS detected indicator */}
            {gpsCoords && (
              <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                <MapPin className="h-3 w-3" />
                GPS location detected — your coordinates will be used for precise delivery
              </div>
            )}

            <input
              type="text"
              placeholder={
                gpsCoords
                  ? "Confirm your address (GPS coordinates captured)"
                  : "Enter your full delivery address"
              }
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />

            {/* Quote status */}
            {fetchingQuote && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Loader2 className="h-3 w-3 animate-spin" />
                Getting delivery quote…
              </div>
            )}
            {quoteError && !fetchingQuote && (
              <p className="text-xs text-red-500">{quoteError}</p>
            )}
            {deliveryQuote && !fetchingQuote && (
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-3 py-2">
                <span className="text-xs text-green-600">
                  ~{deliveryQuote.estimatedMinutes} min · via {deliveryQuote.provider.replace("_", " ")}
                </span>
                <Currency value={deliveryQuote.cost} />
              </div>
            )}
          </div>
        )}

        {/* Phone Number */}
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="text-base font-medium text-gray-500">Phone Number</div>
          <input
            type="tel"
            placeholder="e.g. +256700000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Payment Method */}
        <div className="border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-500 mb-2">
            Payment Method
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-x-2 cursor-pointer">
              <input type="radio" name="payment" value="momo"
                checked={paymentMethod === "momo"}
                onChange={() => setPaymentMethod("momo")}
                className="accent-black" />
              <span className="text-sm text-gray-600">📱 Mobile Money (MoMo)</span>
            </label>
            <label className="flex items-center gap-x-2 cursor-pointer">
              <input type="radio" name="payment" value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
                className="accent-black" />
              <span className="text-sm text-gray-600">💳 Card Payment (Stripe)</span>
            </label>
          </div>
        </div>

        {/* MoMo phone */}
        {paymentMethod === "momo" && (
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex items-center gap-1">
              <div className="text-base font-medium text-gray-500">MoMo Phone Number</div>
              <span className="text-red-500 text-sm">*</span>
            </div>
            <input
              type="tel"
              placeholder="e.g. +256700000000"
              value={momoPhone}
              onChange={(e) => setMomoPhone(e.target.value)}
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black ${
                !momoPhone ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {!momoPhone
              ? <p className="text-xs text-red-500">Required for mobile money payment.</p>
              : <p className="text-xs text-gray-400">You will receive a payment prompt on this number.</p>
            }
          </div>
        )}

        {/* Delivery Cost */}
        {deliveryMethod !== "pickup" && deliveryQuote && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-500">Delivery Cost</div>
            {fetchingQuote
              ? <span className="text-sm text-gray-400">Calculating…</span>
              : <Currency value={deliveryCost} />
            }
          </div>
        )}

        {/* Platform Fee */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-500">Platform Fee (10%)</div>
          <Currency value={platformFee} />
        </div>

        {/* Grand Total */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-bold text-gray-900">Grand Total</div>
          <Currency value={grandTotal} />
        </div>

      </div>

      <Button
        onClick={onCheckout}
        disabled={
          items.length === 0 ||
          fetchingQuote ||
          (deliveryMethod !== "pickup" && !deliveryQuote) ||
          !!pollingStatus ||
          (paymentMethod === "momo" && !momoPhone)
        }
        className="w-full mt-6"
      >
        {pollingStatus === "pending"
          ? "Waiting for MoMo payment…"
          : fetchingQuote
            ? "Fetching quote…"
            : "Checkout"}
      </Button>

      {pollingStatus === "pending" && (
        <p className="text-xs text-center text-gray-400 mt-2">
          Please approve the payment prompt on your phone. Do not close this page.
        </p>
      )}
    </div>
  );
};

export default Summary;
