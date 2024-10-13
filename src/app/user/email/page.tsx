'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

/* eslint-disable */
export default function SignIn() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
