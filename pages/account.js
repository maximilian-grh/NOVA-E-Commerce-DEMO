import Link from "next/link";
import { formatter } from "../utils/formatter";
import { getServerSideProps } from "../utils/stripeuserdata";

function CustomerProfile({
  customer,
  paymentMethod,
  lastFourOrders,
  pdfUrls,
  invoicesSortedByOrders,
}) {
  // Check if the user is unauthenticated
  if (!customer) {
    // The user is not authenticated, redirect to the login page
    <div>Fehler beim Laden.</div>;
  }
  let last4 = "N/A";
  if (paymentMethod && paymentMethod.card) {
    last4 = paymentMethod.card.last4;
  }
  let brand = "N/A";
  if (paymentMethod && paymentMethod.card) {
    brand = paymentMethod.card.brand;
  }

  return (
    <div className="p-8">
      {/* Customer Data - General */}
      <div className="bg-gray-200 rounded-2xl p-8 max-w-md">
        <h1 className="text-xl font-bold pb-4">Kundendaten</h1>
        <p>Name: {customer.name || "Nicht angemeldet"}</p>
        <p>Email: {customer.email || "/"}</p>
        <p>Phone: {customer.phone || "/"}</p>
        <p>Customer ID: {customer.id || "/"}</p>
      </div>
      {/* Customer Data - Payments */}
      <div className="bg-gray-200 rounded-2xl p-8 max-w-md mt-4">
        <h2 className="pb-4 font-bold text-xl">Bezahlungsmethoden</h2>
        <p>Kreditkarte: **** **** **** {last4 || "1234"}</p>
        <p className="flex">
          Kartentyp: <div className="flex pl-2 uppercase">{brand}</div>
        </p>
        <p>Rückstand: {formatter.format(customer.balance / 100)}</p>
      </div>
      {/* Customer Data - Orders */}
      <div className="bg-gray-200 rounded-2xl p-8 max-w-md mt-4">
        <h2 className="pb-4 font-bold text-xl">Alle Rechnungen</h2>
        {invoicesSortedByOrders.map((invoice) => (
          <div className="mt-2 pb-2" key={invoice.id}>
            <p>Betrag: {formatter.format(invoice.amount / 100)}</p>
            <p>
              Datum: {new Date(invoice.created * 1000).toLocaleDateString()}
            </p>
            <p className="flex">
              Status:{" "}
              <div className="text-green-400 pl-2">
                {invoice.status === "succeeded" ? "Bezahlt" : invoice.status}
              </div>
            </p>
            <div>
              <a
                href={pdfUrls[invoicesSortedByOrders.indexOf(invoice)]}
                rel="noreferrer"
              >
                <p>Rechnung herunterladen</p>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 text-xl font-bold underline">
        <Link href="/">Zurück</Link>
      </div>
    </div>
  );
}
export default CustomerProfile;
export { getServerSideProps };