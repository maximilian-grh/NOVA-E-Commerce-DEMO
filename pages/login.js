import Link from "next/link";
import React from "react";

const login = () => {
  return (
    <div>
      <Link href="/api/auth/login">Login</Link>
    </div>
  );
};

export default login;
