import { getSession } from "@auth0/nextjs-auth0";

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);

  // Check if the user is authenticated
  if (session) {
    // The user is authenticated, get their customer data from Stripe
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const customer = await stripe.customers.retrieve(
      session.user.stripeCustomerId
    );

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
