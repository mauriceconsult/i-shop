# Vendly

White-label storefront product built on top of Zuria's infrastructure.
Where Zuria is the marketplace (many shops, one platform), Vendly is the
branded single-shop storefront experience a merchant gets when they sign up.

Vendly shares Zuria's codebase, database, and API — it is not a separate
deployment. Vendly = Zuria with a per-shop custom domain and storefront UI.

Deployed at: https://zuria.maxnovate.com (platform)
Merchant storefronts: custom domains via Vercel domain rewrites

---

## Relationship to Zuria

Vendly is the merchant-facing brand. Zuria is the platform infrastructure.
When working on Vendly features, you are working in the Zuria codebase.

| Concern              | File location in Zuria codebase           |
|----------------------|-------------------------------------------|
| Storefront UI        | `app/[shopSlug]/`                         |
| Shop settings        | `app/dashboard/`                          |
| Product management   | `app/dashboard/products/`                 |
| Order management     | `app/dashboard/orders/`                   |
| Earnings / payouts   | `app/dashboard/earnings/`                 |
| MoMo withdrawal      | `app/dashboard/earnings/withdraw/`        |
| Delivery settings    | `app/dashboard/delivery/`                 |

See `zuria-CLAUDE.md` for the full Zuria technical reference.

---

## Vendly-specific concepts

### Shop-linked riders (0% platform fee)

A merchant can approve their own Dukaboda riders directly.
These riders keep 100% of the delivery fee — it is bundled into the order
payout split and settled at payment confirmation, not as a separate MoMo transfer.
`Rider.approvedBy === "shop"` → fee-free rider.

### Wildcard riders (10% platform fee)

Platform-approved riders eligible for any shop's deliveries.
`Rider.approvedBy === "platform"` → 10% deducted from delivery fee.
Fee deducted at payment confirmation via `calculateFees(..., "platform")`.

### Merchant withdrawal flow

```
Merchant: POST /api/[shopId]/withdraw
  → validates available balance
  → GetBalance check (Disbursements wallet must cover withdrawal)
  → MoMo Transfer to shop.momoPhone
  → Disbursement record created (momoReferenceId must exist before Transfer)
  → Webhook confirms: shopPayoutStatus → "sent"
```

### Checkout flow

```
Customer: POST /api/[shopId]/checkout/momo
  → body: { productIds, phone, deliveryMethod, deliveryCost,
            deliveryQuoteId, deliveryProvider, deliveryLat, deliveryLng }
  → referenceId: ORD-{orderId}  ← prefix required by webhook dispatcher
  → returns: { referenceId, orderId }
```

---

## Vehicle delivery pricing (shown on Vendly storefront)

| Vehicle    | Base fare  | Per km     | Max distance |
|------------|------------|------------|--------------|
| Bicycle    | UGX 2,000  | UGX 800    | 3 km         |
| Motorcycle | UGX 3,000  | UGX 1,200  | 8 km         |
| Car / Van  | UGX 5,000  | UGX 2,000  | Unlimited    |

These values are the source of truth in `lib/delivery/providers/custom.ts`.
If rates change there, update any hardcoded display values in storefront UI.

---

## MTN MoMo — merchant payout

Merchants withdraw earnings to their registered MTN MoMo number.
Disbursements credentials (separate from Collections):

```

### Sandbox → production checklist (Vendly-specific)

- [ ] Merchant withdrawal tested with UAT SIM-04 (rider/merchant payee SIM)
- [ ] GetBalance check confirmed before every Transfer call
- [ ] `shopPayoutStatus` transitions: `pending → sent | failed`
- [ ] Withdrawal idempotency: second request blocked while first is processing

---

## Do not

- Do not treat Vendly as a separate codebase — all changes go in Zuria
- Do not create a separate Prisma schema for Vendly — same DB as Zuria
- Do not bypass the Disbursement record creation before MoMo Transfer —
  the webhook needs it to match the referenceId
- Do not allow withdrawals when Disbursements wallet balance is insufficient —
  always call GetBalance first
- Do not show wildcard riders as "0% fee" in the Vendly dashboard —
  they retain 90%, and this must be disclosed before rider accepts a job