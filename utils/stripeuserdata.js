import { getSession } from "@auth0/nextjs-auth0";

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

    // Retrieve all Invoice Data (type: .pdf)
    const invoices = await stripe.invoices.list({
      customer: customer.id,
      status: "paid",
    });
    // fetch only the invoice pdf url
    const pdfUrls = invoices.data.map((invoice) => invoice.invoice_pdf);

    const invoicesSortedByOrders = lastFourOrders.map((order) => {
      const invoice = invoices.data.find((inv) => inv.charge === order.id);
      return { ...invoice, order_id: order.id };
    });

    return {
      props: {
        customer: customer,
        paymentMethod: paymentMethod,
        lastFourOrders: lastFourOrders,
        pdfUrls: pdfUrls,
        invoicesSortedByOrders: invoicesSortedByOrders,
      },
    };
  } else {
    // The user is not authenticated, return an empty object
    console.log.apply("Nicht angemeldet");
    return {
      props: {},
    };
  }
}
