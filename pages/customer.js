import { getSession } from "@auth0/nextjs-auth0";

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);

  // Check if the user is authenticated
  if (session) {
    // Get the user's metadata from Auth0
    // const auth0 = process.env.AUTH0_CLIENT_SECRET;
    // const user = await auth0.getUser(session.user.sub, {
    //   fields: "app_metadata",
    // });
    // const appMetadata = user.app_metadata;

    // The user is authenticated, get their customer data from Stripe
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const customer = await stripe.customers.retrieve("cus_N9LutrpIjs9q9p");

    return {
      props: {
        customer: customer,
      },
    };
  } else {
    // The user is not authenticated, return an empty object

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
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>ID: {customer.id}</p>
      <p>Desc: {customer.description}</p>
      <p>Mein Balance: {customer.balance}</p>
    </div>
  );
}

export default CustomerProfile;
