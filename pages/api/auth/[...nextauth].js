import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { google } from "googleapis";

export const authOptions = {
	secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
			authorizationUrl:
				"https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
			tokenUrl: "https://accounts.google.com/o/oauth2/v2/token",
			userinfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
			idToken: true,
			idTokenVerification: false,
			secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
			// Set the desired expiration time (30 days in this example)
			expires: 30 * 24 * 60 * 60, // 30 days in seconds

			authorization: {
				params: {
					scope: `https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://mail.google.com https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/directory.readonly https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`,
				},
			},
		}),
	],
	pages: {},
	callbacks: {
		async jwt({ token, account, user, profile, isNewUser }) {
			// Persist the OAuth access_token to the token right after signin
			if (account?.access_token) {
				// assign the access_token to the token variable
				token.accessToken = account?.access_token;
			}
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;

			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export default handler;
