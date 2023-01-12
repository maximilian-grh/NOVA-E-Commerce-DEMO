# © NOVA Kreativagentur OG

###### Language:

- JavaScript

###### Frontend:

- Next.js
- Tailwindcss

###### Backend:

- Stripe [Customer, Product, Payments]
- Auth0 [User Login / Registraion]

---

# Workflow:

Auth0 is used for user login and registration. This user data is synced with Stripe via a custom trigger, which adds the Stripe customer ID to the access token, links the user to Stripe, and fully integrates Stripe.
