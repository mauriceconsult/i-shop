import Container from "@/components/ui/container";

const TermsPage = () => {
  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-3xl mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400 mb-10">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-UG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section className="space-y-8 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                1. About This Platform
              </h2>
              <p>
                This platform is operated by Maxnovate Limited, a company
                registered in Uganda. By accessing or using this platform as a
                buyer or seller, you agree to be bound by these Terms of
                Service. If you do not agree, you must not use this platform.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                2. Eligibility
              </h2>
              <p>
                You must be at least 18 years of age to use this platform. By
                using this platform you represent and warrant that you meet this
                requirement and that you have the legal capacity to enter into a
                binding contract.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                3. Platform Role
              </h2>
              <p>
                Maxnovate Limited operates as a marketplace facilitator only. We
                are not a party to transactions between buyers and sellers. We
                do not own, store, ship, or inspect any products listed on this
                platform. Each seller is solely responsible for their listings,
                product quality, and fulfillment of orders.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                4. Platform Fee
              </h2>
              <p>
                A platform fee of 10% is charged on every completed transaction.
                This fee is automatically deducted from the seller&apos;s payout. The
                fee is non-refundable once a transaction is marked as completed.
                Maxnovate Limited reserves the right to revise this fee with 30
                days written notice to sellers.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                5. Payments
              </h2>
              <p>
                Payments are processed via Stripe (card payments) and MTN Mobile
                Money (MoMo). By completing a purchase you authorize the
                applicable payment processor to charge your payment method. All
                transactions are subject to the terms of the relevant payment
                processor. Maxnovate Limited is not responsible for payment
                processor errors, delays, or failures.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                6. Buyer Rights and Refunds
              </h2>
              <p>
                Buyers may request a refund within 48 hours of delivery if the
                product received materially differs from its description. Refund
                requests must be submitted via the platform&apos;s support channel
                with photographic evidence. Approved refunds will be processed
                within 7 business days to the original payment method. Maxnovate
                Limited acts as a mediator in disputes but final resolution
                responsibility lies with the seller.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                7. Prohibited Conduct
              </h2>
              <p>The following are strictly prohibited on this platform:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Listing counterfeit, stolen, or illegal goods</li>
                <li>
                  Providing false product descriptions or misleading images
                </li>
                <li>Manipulating reviews or ratings</li>
                <li>
                  Circumventing platform payments to transact off-platform
                </li>
                <li>Harassment of buyers, sellers, or platform staff</li>
                <li>Creating multiple accounts to evade suspension</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                8. Account Suspension and Termination
              </h2>
              <p>
                Maxnovate Limited reserves the right to suspend or permanently
                terminate any account found in violation of these terms, without
                prior notice. Suspended sellers forfeit pending payouts if the
                suspension is due to fraudulent activity. Termination decisions
                may be appealed in writing within 14 days.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                9. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, Maxnovate
                Limited shall not be liable for any indirect, incidental,
                special, or consequential damages arising from your use of this
                platform, including but not limited to loss of profits, data, or
                goodwill. Our total liability in any circumstance shall not
                exceed the platform fees collected from the relevant
                transaction.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                10. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the Republic of Uganda. Any disputes arising
                under these Terms shall be subject to the exclusive jurisdiction
                of the courts of Uganda. For international sellers and buyers,
                these Terms shall apply to the extent permitted by local law.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                11. Changes to These Terms
              </h2>
              <p>
                We may update these Terms at any time. Continued use of the
                platform after changes constitutes acceptance of the new Terms.
                Material changes will be communicated via email to registered
                users at least 14 days before taking effect.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                12. Contact
              </h2>
              <p>
                For questions about these Terms, contact us at:
                <br />
                Maxnovate Limited
                <br />
                Kampala, Uganda
                <br />
                legal@maxnovate.com
              </p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;
