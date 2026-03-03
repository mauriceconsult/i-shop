"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Summary = () => {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryQuote, setDeliveryQuote] = useState<{
    cost: number;
    estimatedMinutes: number;
    currency: string;
    quoteId?: string;
  } | null>(null);
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "momo">(
    "stripe",
  );
  const [momoPhone, setMomoPhone] = useState("");
  const [pollingStatus, setPollingStatus] = useState<string | null>(null);

  // Debounced delivery quote fetch
  useEffect(() => {
    if (deliveryMethod === "pickup" || !deliveryAddress) {
      setDeliveryQuote(null);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        setFetchingQuote(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/delivery/quote`,
          { deliveryAddress, deliveryMethod },
        );
        setDeliveryQuote(response.data);
      } catch {
        toast.error("Could not fetch delivery quote. Check your address.");
        setDeliveryQuote(null);
      } finally {
        setFetchingQuote(false);
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [deliveryAddress, deliveryMethod]);

  const itemsTotal = items.reduce(
    (total, item) => total + Number(item.price),
    0,
  );
  const deliveryCost = deliveryQuote?.cost ?? 0;
  const grandTotal = itemsTotal + deliveryCost;

  const pollMomoStatus = async (referenceId: string, orderId: string) => {
    setPollingStatus("pending");
    const maxAttempts = 12;
    let attempts = 0;

    const poll = async (): Promise<void> => {
      if (attempts >= maxAttempts) {
        setPollingStatus(null);
        toast.error("Payment timed out. Please try again.");
        return;
      }
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout/momo/status`,
          { params: { referenceId, orderId } },
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
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return poll();
      } catch {
        setPollingStatus(null);
        toast.error("Could not verify payment status.");
      }
    };
    await poll();
  };

  const onCheckout = async () => {
    if (deliveryMethod !== "pickup" && !deliveryAddress) {
      toast.error("Please enter a delivery address.");
      return;
    }
    if (deliveryMethod !== "pickup" && !deliveryQuote) {
      toast.error("Please wait for delivery quote.");
      return;
    }
    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (paymentMethod === "stripe") {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          deliveryMethod,
          deliveryCost,
          deliveryAddress,
          deliveryQuoteId: deliveryQuote?.quoteId,
          phone,
        },
      );
      window.location = response.data.url;
    } else {
      if (!momoPhone) {
        toast.error("Please enter your MoMo phone number.");
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/momo`,
        {
          productIds: items.map((item) => item.id),
          phone: momoPhone,
          address: deliveryAddress,
          deliveryMethod,
          deliveryCost,
          deliveryQuoteId: deliveryQuote?.quoteId,
        },
      );
      toast.success("Check your phone for a MoMo payment prompt.");
      await pollMomoStatus(response.data.referenceId, response.data.orderId);
    }
  };

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
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="pickup">Self Pickup - Free</option>
            <option value="standard">Standard Delivery</option>
            <option value="uber_direct">Uber Direct (Door to Door)</option>
          </select>
        </div>

        {/* Delivery Address */}
        {deliveryMethod !== "pickup" && (
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="text-base font-medium text-gray-500">
              Delivery Address
            </div>
            <input
              type="text"
              placeholder="Enter your full delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            {fetchingQuote && (
              <p className="text-xs text-gray-400">
                Fetching delivery quote...
              </p>
            )}
            {deliveryQuote && !fetchingQuote && (
              <p className="text-xs text-green-600">
                Estimated delivery: {deliveryQuote.estimatedMinutes} mins
              </p>
            )}
          </div>
        )}

        {/* Phone Number */}
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="text-base font-medium text-gray-500">
            Phone Number
          </div>
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
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
                className="accent-black"
              />
              <span className="text-sm text-gray-600">
                💳 Card Payment (Stripe)
              </span>
            </label>
            <label className="flex items-center gap-x-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={() => setPaymentMethod("momo")}
                className="accent-black"
              />
              <span className="text-sm text-gray-600">
                📱 Mobile Money (MoMo)
              </span>
            </label>
          </div>
        </div>

        {/* MoMo Phone */}
        {paymentMethod === "momo" && (
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="text-base font-medium text-gray-500">
              MoMo Phone Number
            </div>
            <input
              type="tel"
              placeholder="e.g. +256700000000"
              value={momoPhone}
              onChange={(e) => setMomoPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <p className="text-xs text-gray-400">
              You will receive a payment prompt on this number.
            </p>
          </div>
        )}

        {/* Delivery Cost */}
        {deliveryMethod !== "pickup" && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-500">
              Delivery Cost
            </div>
            {fetchingQuote ? (
              <span className="text-sm text-gray-400">Calculating...</span>
            ) : (
              <Currency value={deliveryCost} />
            )}
          </div>
        )}

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
          !!pollingStatus
        }
        className="w-full mt-6"
      >
        {pollingStatus === "pending"
          ? "Waiting for MoMo payment..."
          : fetchingQuote
            ? "Fetching Quote..."
            : "Checkout"}
      </Button>

      {pollingStatus === "pending" && (
        <p className="text-xs text-center text-gray-400 mt-2">
          Please approve the payment prompt on your phone. Do not close this
          page.
        </p>
      )}
    </div>
  );
};

export default Summary;
