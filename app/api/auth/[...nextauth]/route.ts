import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

const handler = NextAuth({
    providers:[
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    pages:{
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: null
    },
})

export { handler as GET, handler as POST }