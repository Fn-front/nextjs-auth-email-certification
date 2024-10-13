import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { MemoryCacheAdapter } from '@/lib/nextAuth/memoryAdapter';

const options: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url }) {
        // NodemailerでSMTPトランスポートを作成
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_SERVER_HOST,
          port: Number(process.env.EMAIL_SERVER_PORT),
          secure: Number(process.env.EMAIL_SERVER_PORT) === 587, // SSL/TLS設定
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: identifier,
          subject: 'Your sign-in link for MyApp',
          html: `<p>Hello,</p>
                 <p>Click <a href="${url}">this link</a> to sign in.</p>
                 <p>This link will expire in 10 minutes.</p>`,
        };

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log('Verification email sent:', info.response);
        } catch (error) {
          console.error('Failed to send verification email:', error);
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MemoryCacheAdapter,
  // デフォルト設定（メールリンクの有効期限など）
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      // セッションに正しいメールを設定
      if (token.email) {
        session.user!.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      // トークンにメールを設定
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },
  },
  // その他のNextAuth設定
};

export default options;
