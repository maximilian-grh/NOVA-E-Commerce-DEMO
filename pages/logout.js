import Link from "next/link";
import React from "react";

const logout = () => {
  return (
    <div>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  );
};

export default logout;
