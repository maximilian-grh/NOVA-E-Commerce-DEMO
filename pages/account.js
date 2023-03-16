import Link from "next/link";
import { formatter } from "../utils/formatter";
import { getServerSideProps } from "../utils/stripeuserdata";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function CustomerProfile({
  customer,
  CustomerPaymentMethod,
  lastFourOrders,
  pdfUrls,
  invoicesSortedByOrders,
  address,
}) {
  let last4 = "N/A";
  if (CustomerPaymentMethod && CustomerPaymentMethod.card) {
    last4 = CustomerPaymentMethod.card.last4;
  }
  let brand = "N/A";
  if (CustomerPaymentMethod && CustomerPaymentMethod.card) {
    brand = CustomerPaymentMethod.card.brand;
  }

  if (!customer) {
    return <div>Du bist nicht angemeldet</div>;
  } else {
    customer;
    return (
      <div className="p-8 bg-black h-full w-full text-white">
        {/* Customer Data - General */}
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md">
          <h1 className="text-xl font-bold pb-4">Kundendaten</h1>
          <p>Name: {customer.name || "/"}</p>
          <p>Email: {customer.email || "/"}</p>
          <p>Telefonnummer: {customer.phone || "/"}</p>
          <p>Kundennummer: {customer.id || "/"}</p>
        </div>

        {/* Customer Data - Address */}
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md mt-4">
          <h1 className="text-xl font-bold pb-4">Rechnungsadresse</h1>
          {address ? (
            <>
              <p>Adresszeile 1 : {address.line1 || "/"}</p>
              <p>Adresszeile 2 : {address.line2 || "/"}</p>
              <p>Postleitzahl : {address.postal_code || "/"}</p>
              <p>Stadt: {address.city || "/"}</p>
              <p>Land: {address.country || "/"}</p>
            </>
          ) : (
            <p className="text-gray-400">Adressdaten nicht verfügbar</p>
          )}
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
                <div className=" pl-2">
                  {invoice.status === "paid" ? (
                    <CheckCircleIcon className="h-6 w-8 text-green-400" />
                  ) : (
                    <div>
                      {/* invoice.status */}
                      <div className="text-red-400">Offen</div>
                    </div>
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
