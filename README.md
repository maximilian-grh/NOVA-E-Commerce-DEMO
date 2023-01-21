# © NOVA Kreativagentur OG

_This is for demo purposes only!_

###### Language:

- JavaScript

###### Frontend:

- Next.js
- Tailwindcss
- Herocions

###### Backend:

- Stripe [Customer, Product, Payments]
- Auth0 [User Login / Registraion]

---

# Workflow:

Auth0 is used for user login and registration. This user data is synced with Stripe via a custom trigger, which adds the Stripe customer ID to the access token, links the user to Stripe, and fully integrates Stripe.

# Client Page:

If the client needs to update his client information (name, email, shipping and so on) he can do it with the "edit-icon". This function allows updating all client data in real time, which is very efficient because the webshop owner doesn't need to edit data manually.

The Client sees all data:

- Name
- E-Mail
- Phone Number
- Customer ID
- Shipping Adress

--- This is not included to edit as a client: ---

- Payment Method
  - Type
  - Last 4 Numbers
  - Residue
- Last 4 Orders
  - Amount
  - Date
  - Status
  - Invoice .pdf
