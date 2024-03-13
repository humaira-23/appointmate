import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './lib/mongodb'
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import bcrypt from "bcrypt"
import db from "@/utils/db"

db.connectDb()

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email = credentials.email
        const password = credentials.password
        const user = await User.findOne({email: email})
  
        if (user) {
          return SignInUser({password, user})
        } else {
          throw new Error("This email doesn't exist.")
        }
      }
    }),
  ],

  callbacks: {
    async session({session, token}) {
      let user = await User.findById(token.sub)
      session.user.id = token.sub || user._id.toString()
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET
})

const SignInUser = async({password, user}) => {
  if(!user.password) {
    throw new Error("Please enter your password")
  }
  const testPassword = await bcrypt.compare(password, user.password)
  if(!testPassword) {
    throw new Error("Email or Password is incorrect!")
  }
  return user
}