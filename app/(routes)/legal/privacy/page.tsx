import Container from "@/components/ui/container";

const PrivacyPage = () => {
  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-3xl mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Policy
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
                1. Data We Collect
              </h2>
              <p>We collect the following data when you use our platform:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Name and email address (via account registration)</li>
                <li>Phone number (for order and payment processing)</li>
                <li>Delivery address (for order fulfillment)</li>
                <li>
                  Payment information (processed securely by Stripe or MTN)
                </li>
                <li>Device and browser information (for security purposes)</li>
                <li>Order and transaction history</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                2. How We Use Your Data
              </h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>To process and fulfill orders</li>
                <li>To process payments and disbursements</li>
                <li>To communicate order updates and support</li>
                <li>To prevent fraud and ensure platform security</li>
                <li>To improve our platform and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                3. Data Sharing
              </h2>
              <p>We do not sell your personal data. We share data only with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  Payment processors (Stripe, MTN MoMo) solely for transaction
                  processing
                </li>
                <li>
                  Delivery partners (Uber Direct, Glovo) solely for order
                  fulfillment
                </li>
                <li>Legal authorities when required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                4. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and associated data</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, contact us at privacy@max18tech.com
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                5. Data Security
              </h2>
              <p>
                We implement industry-standard security measures including SSL
                encryption, secure database hosting, and access controls.
                Payment data is never stored on our servers — it is handled
                exclusively by PCI-compliant payment processors.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                6. Cookies
              </h2>
              <p>
                We use essential cookies only — for authentication and cart
                persistence. We do not use advertising or tracking cookies. You
                may disable cookies in your browser settings but this may affect
                platform functionality.
              </p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPage;
