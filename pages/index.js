import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Online Shop Template</title>
        <meta name="description" content="Online Shop Template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white text-black text-xl h-screen">
        <div className="flex justify-center gap-12 p-8 bg-gray-900 ">
          <div>
            <Link href="/api/auth/login" className="hover:text-primary">
              Login
            </Link>
          </div>
          <div>
            <Link href="/api/auth/logout" className="hover:text-primary">
              Logout
            </Link>
          </div>
          <div>
            <Link href="/account" className="hover:text-primary">
              Mein Account
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
