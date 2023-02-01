import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>NOVA E-Commerce DEMO</title>
        <meta name="description" content="NOVA E-Commerce DEMO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black text-white h-screen">
        <div className="flex justify-center gap-12 p-8 bg-gray-900 ">
          <div>
            <Link
              href="/api/auth/login"
              className="hover:text-blue-300 hover:underline-offset-4"
            >
              Login
            </Link>
          </div>
          <div>
            <Link href="/api/auth/logout">Logout</Link>
          </div>
          <div>
            <Link
              href="/account"
              className="hover:text-blue-300 hover:underline-offset-4"
            >
              Mein Account
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
