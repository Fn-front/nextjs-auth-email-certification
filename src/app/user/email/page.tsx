'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

/* eslint-disable */
export default function SignIn() {
  const { data: session } = useSession()
  return (
    <div>
      {!!session && <>
        <p>myName: {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>}
      {!session && <>
        <button onClick={() => signIn()}>Sign in</button>
      </>
      }
    </div>
  );
}
