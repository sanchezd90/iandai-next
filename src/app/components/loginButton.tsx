'use client'
import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <button onClick={() => signIn("google")}>
      Login with Google
    </button>
  );
}

export default LoginButton;