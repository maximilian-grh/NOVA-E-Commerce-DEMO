import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);

  // Check if the user is authenticated
  if (session) {
    // Get the email of the logged-in user
    const mail = session.user.email;
    // Load Stripe
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    // Use the email to retrieve the customer data from Stripe
    const customers = await stripe.customers.list({ email: mail });
    const customer = await stripe.customers.retrieve(customers.data[0].id);
    // Retrieve Payments from stripe by Customer ID
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: "card",
    });
    const paymentMethod = paymentMethods.data[0];
    // Retrieve the last 4 Orders of the customer
    const charges = await stripe.charges.list({
      customer: customer.id,
      limit: 4,
    });
    const lastFourOrders = charges.data;
    // Invoice by Customer
    // const invoices = await stripe.invoices.retrieve(
    //   "in_1MPR33Hoy0V6vVkakNrwVJ0L, in_1MPR33Hoy0V6vVkakNrwVJ0L"
    // );
    // const receiptUrl = invoices.receipt_url;

    return {
      props: {
        customer: customer,
        paymentMethod: paymentMethod,
        lastFourOrders: lastFourOrders,
        // receiptUrl: receiptUrl,
      },
    };
  } else {
    // The user is not authenticated, return an empty object
    console.log("User not authenticated");
    return {
      props: {},
    };
  }
}
// Formatter for EURO
const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function CustomerProfile({
  customer,
  paymentMethod,
  lastFourOrders,
  // receiptUrl,
}) {
  // Check if the user is authenticated
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
        <p>Name: {customer.name || "N/A"}</p>
        <p>Email: {customer.email || "N/A"}</p>
        <p>Phone: {customer.phone || "N/A"}</p>
      </div>
      {/* Customer Data - Payments */}
      <div className="bg-gray-200 rounded-2xl p-8 max-w-md mt-4">
        <h2 className="pb-4 font-bold text-xl">Bezahlungsmethoden</h2>
        <p>Kreditkarte: **** **** **** {last4}</p>
        <p className="flex">
          Card Brand: <div className="flex pl-2 uppercase">{brand}</div>
        </p>
        <p>Mein Balance: {formatter.format(customer.balance || "N/A")}</p>
      </div>
      {/* Customer Data - Orders */}
      <div className="bg-gray-200 rounded-2xl p-8 max-w-md mt-4">
        <h2 className="pb-4 font-bold text-xl">Letzten Bestellungen</h2>
        {lastFourOrders.map((order) => (
          <div className="mt-2 pb-2" key={order.id}>
            <p>Amount: {formatter.format(order.amount)}</p>
            <p>Datum: {new Date(order.created * 1000).toLocaleDateString()}</p>
            <p className="flex">
              Status: <div className="text-green-400 pl-2">{order.status}</div>
            </p>
            {/* <Link href={receiptUrl} target="_blank">
              Download Receipt
            </Link> */}
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
