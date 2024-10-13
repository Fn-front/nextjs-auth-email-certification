import NextAuth from 'next-auth/next';

import options from '@/lib/nextAuth/options';

const handler = NextAuth(options);

export { handler as GET, handler as POST };