import { getSession } from "@auth0/nextjs-auth0";

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);

  // Check if the user is authenticated
  if (session) {
    // Get the email of the logged-in user
    const mail = session.user.email;

    // Use the email to retrieve the customer data from Stripe
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const customers = await stripe.customers.list({ email: mail });
    const customer = await stripe.customers.retrieve(customers.data[0].id);

    return {
      props: {
        customer: customer,
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

function CustomerProfile({ customer }) {
  // Check if the user is authenticated
  if (!customer) {
    // The user is not authenticated, redirect to the login page
    <div>Fehler beim Laden.</div>;
  }

  return (
    <div>
      <h1>Customer Profile</h1>
      <p>Name: {customer.name || "N/A"}</p>
      <p>Email: {customer.email || "N/A"}</p>
      <p>Phone: {customer.phone || "N/A"}</p>
      <p>ID: {customer.id || "N/A"}</p>
      <p>Desc: {customer.description || "N/A"}</p>
      <p>Mein Balance: {customer.balance || "N/A"}</p>
    </div>
  );
}

export default CustomerProfile;
