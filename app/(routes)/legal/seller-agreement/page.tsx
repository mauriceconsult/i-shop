import Container from "@/components/ui/container";

const SellerAgreementPage = () => {
  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-3xl mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Seller Agreement
          </h1>
          <p className="text-sm text-gray-400 mb-10">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-UG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-yellow-800 font-medium">
              ⚠ This is a legally binding agreement between you (the Seller) and
              Maxnovate Limited. By creating a shop on this platform you agree
              to all terms below.
            </p>
          </div>

          <section className="space-y-8 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                1. Seller Eligibility
              </h2>
              <p>
                To sell on this platform you must be at least 18 years old,
                legally capable of entering contracts, and either a registered
                business or an individual operating lawfully in your
                jurisdiction. You warrant that all information provided during
                registration is accurate and complete.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                2. Seller Obligations
              </h2>
              <p>As a seller you are obligated to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  List only products you legally own or are authorized to sell
                </li>
                <li>
                  Provide accurate descriptions, prices, and images for all
                  products
                </li>
                <li>
                  Fulfill orders within the timeframe stated in your listing
                </li>
                <li>Maintain sufficient stock for all active listings</li>
                <li>Respond to buyer inquiries within 24 hours</li>
                <li>
                  Comply with all applicable laws including consumer protection,
                  tax, and import/export regulations
                </li>
                <li>
                  Provide accurate mobile money or bank details for payouts
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                3. Prohibited Listings
              </h2>
              <p>
                The following products are strictly prohibited and will result
                in immediate account termination and potential legal action:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Counterfeit or replica goods of any kind</li>
                <li>Stolen property</li>
                <li>Controlled substances, drugs, or drug paraphernalia</li>
                <li>Weapons, ammunition, or explosives</li>
                <li>Products infringing on intellectual property rights</li>
                <li>Adult or obscene content</li>
                <li>Any product whose sale is prohibited under Ugandan law</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                4. Platform Fee and Payouts
              </h2>
              <p>
                A platform fee of 10% of the sale price (excluding delivery) is
                deducted from every completed transaction. The remaining 90%
                constitutes your payout and will be disbursed to your registered
                mobile money number within 24 hours of order completion. Payouts
                are subject to a minimum threshold of UGX 10,000. Maxnovate
                Limited reserves the right to withhold payouts pending
                investigation of disputed transactions.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                5. Seller Liability
              </h2>
              <p>
                You as the seller bear full legal and financial liability for:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Product defects, inaccuracies, or failure to match
                  descriptions
                </li>
                <li>
                  Personal injury or property damage caused by your products
                </li>
                <li>
                  Failure to fulfill orders after payment has been received
                </li>
                <li>Tax obligations arising from your sales</li>
                <li>
                  Any third-party intellectual property claims against your
                  listings
                </li>
              </ul>
              <p className="mt-2">
                In the event of a verified breach of this agreement, Maxnovate
                Limited reserves the right to recover damages from withheld
                payouts and to pursue legal remedies under Ugandan law.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                6. Refunds and Disputes
              </h2>
              <p>
                If a buyer raises a valid dispute within 48 hours of delivery,
                Maxnovate Limited may initiate a chargeback from your next
                payout equivalent to the disputed transaction amount while the
                dispute is under review. Sellers may contest disputes with
                evidence within 72 hours. Uncontested disputes will be
                automatically resolved in the buyer&apos;s favor.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                7. Intellectual Property
              </h2>
              <p>
                By uploading product images and descriptions to this platform
                you grant Maxnovate Limited a non-exclusive, royalty-free
                license to display, reproduce, and promote this content for the
                purpose of operating the platform. You retain full ownership of
                your content. You warrant that all uploaded content is your
                original work or that you have the right to use it.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                8. Suspension and Termination
              </h2>
              <p>
                Maxnovate Limited may suspend or terminate your seller account
                for any of the following reasons:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Breach of any term of this agreement</li>
                <li>
                  Three or more unresolved buyer complaints within 30 days
                </li>
                <li>Suspected fraudulent activity</li>
                <li>
                  Failure to fulfill more than 10% of orders in any calendar
                  month
                </li>
                <li>Providing false registration information</li>
              </ul>
              <p className="mt-2">
                Upon termination, pending payouts for legitimate completed
                orders will be disbursed within 14 business days after any
                dispute resolution period.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                9. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless Maxnovate
                Limited, its directors, employees, and agents from any claims,
                damages, losses, or expenses (including legal fees) arising from
                your use of the platform, your products, or your breach of this
                agreement.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                10. Governing Law and Dispute Resolution
              </h2>
              <p>
                This agreement is governed by the laws of Uganda. Disputes shall
                first be attempted to be resolved through negotiation within 30
                days. If unresolved, disputes shall be referred to arbitration
                under the Arbitration and Conciliation Act (Cap 4, Uganda)
                before resorting to litigation. The seat of arbitration shall be
                Kampala, Uganda.
              </p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default SellerAgreementPage;
