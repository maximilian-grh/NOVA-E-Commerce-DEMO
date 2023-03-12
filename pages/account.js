import Link from "next/link";
import { formatter } from "../utils/formatter";
import { getServerSideProps } from "../utils/stripeuserdata";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function CustomerProfile({
  customer,
  paymentMethod,
  lastFourOrders,
  pdfUrls,
  invoicesSortedByOrders,
}) {
  let last4 = "N/A";
  if (paymentMethod && paymentMethod.card) {
    last4 = paymentMethod.card.last4;
  }
  let brand = "N/A";
  if (paymentMethod && paymentMethod.card) {
    brand = paymentMethod.card.brand;
  }

  if (!customer) {
    <div>Error 303</div>;
  } else {
    customer;
    return (
      <div className="p-8 bg-black h-full text-white">
        {/* Customer Data - General */}
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md">
          <h1 className="text-xl font-bold pb-4">Kundendaten</h1>
          <p>Name: {customer.name || "/"}</p>
          <p>Email: {customer.email || "/"}</p>
          <p>Phone: {customer.phone || "/"}</p>
          <p>Customer ID: {customer.id || "/"}</p>
        </div>
        {/* Customer Data - Payments */}
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md mt-4">
          <h2 className="pb-4 font-bold text-xl">Bezahlungsmethoden</h2>
          <p>Kreditkarte: **** **** **** {last4 || "1234"}</p>
          <p className="flex">
            Kartentyp: <div className="flex pl-2 uppercase">{brand}</div>
          </p>
          <p>Guthaben: {formatter.format(customer.balance / 100)}</p>
        </div>
        {/* Customer Data - Orders */}
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md mt-4">
          <h2 className="pb-4 font-bold text-xl">Rechnungen</h2>
          {invoicesSortedByOrders.map((invoice, index) => (
            <div className="mt-2 pb-2" key={invoice.id}>
              <p>Betrag: {formatter.format(invoice.amount_due / 100)}</p>
              <p>
                Datum: {new Date(invoice.created * 1000).toLocaleDateString()}
              </p>
              <p className="flex">
                Status:{" "}
                <div className="text-green-400 pl-2">
                  {invoice.status === "paid" ? (
                    <CheckCircleIcon className="h-6 w-8" />
                  ) : (
                    invoice.status
                  )}
                </div>
              </p>
              <div>
                <a href={pdfUrls[index]} rel="noreferrer">
                  <p className="flex">
                    <p className="hover:underline">Rechnung herunterladen</p>{" "}
                    <ArrowDownTrayIcon className="flex h-6 w-4 justify-center ml-2" />
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-12 text-2xl font-bold underline">
          <Link href="/">Zurück</Link>
        </div>
      </div>
    );
  }
}
export default CustomerProfile;
export { getServerSideProps };
