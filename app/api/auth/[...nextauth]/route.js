import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// 1. Define and Export authOptions
// This allows getServerSession to access your config in Server Components
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // When the user first signs in, attach the ID to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Transfer the ID from the token to the session
      if (session.user) {
        session.user.id = token.id || token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};

// 2. Initialize NextAuth with the options
const handler = NextAuth(authOptions);

// 3. Export the handler for GET and POST requests
export { handler as GET, handler as POST };
