import { getSession } from "@auth0/nextjs-auth0";

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);

  // Check if the user is authenticated
  if (session) {
    // Get the email of the logged-in user
    const email = session.user.email;

    // Load Stripe
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Retrieve the customer with the specified email
    const customer = await stripe.customers
      .list({ email: email, limit: 1 })
      .then((customers) => customers.data[0]);

    // Retrieve Payment Method ID from customer data
    const paymentMethodId = customer.invoice_settings.default_payment_method;

    // Retrieve Payment Method data if payment method ID is not null
    let paymentMethod = null;
    if (paymentMethodId) {
      paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    }

    // Retrieve Address data from Payment Method if payment method exists
    let address = null;
    if (paymentMethod && paymentMethod.billing_details) {
      address = paymentMethod.billing_details.address;
    } else if (customer.address) {
      address = customer.address;
    }

    // Retrieve the last 4 Orders of the customer
    const charges = await stripe.charges.list({
      customer: customer.id,
      limit: 4,
    });

    const lastFourOrders = charges.data;

    // Retrieve all Invoice Data (type: .pdf)
    const invoices = await stripe.invoices.list({
      customer: customer.id,
    });
    const invoicesSortedByOrders = invoices.data.sort(
      (a, b) => b.created - a.created
    );
    const pdfUrls = invoicesSortedByOrders.map(
      (invoice) => invoice.invoice_pdf
    );

    return {
      props: {
        customer: customer,
        paymentMethod: paymentMethod,
        address: address,
        lastFourOrders: lastFourOrders,
        pdfUrls: pdfUrls,
        invoicesSortedByOrders: invoicesSortedByOrders,
      },
    };
  } else {
    // The user is not authenticated, return an empty object
    console.log("Not authenticated");
    return {
      props: {},
    };
  }
}
