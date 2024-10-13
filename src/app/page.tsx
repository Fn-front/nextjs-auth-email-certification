'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

/* eslint-disable */
export default function SignIn() {
  const { data: session } = useSession()
  return (
    <div>
      {!!session && <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <p>myName:</p>
          <TextField variant="outlined" defaultValue={session.user?.email} sx={{ input: { color: '#fff', width: '300px', fontSize: '1.5rem' }, fieldset: { borderColor: '#fff' }, paddingLeft: '16px' }} />
        </Box>
        <Button variant="outlined" size="large" onClick={() => signOut()} sx={{ fontSize: '1.5rem', marginTop: '16px' }}>Sign Out</Button>
      </>}
      {!session && <>
        <Button variant="outlined" size="large" onClick={() => signIn()} sx={{ fontSize: '1.5rem' }}>Sign in</Button>
      </>
      }
    </div>
  );
}