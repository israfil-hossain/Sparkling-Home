import { ApiClient } from '@/api/configAxios'
import { API } from '@/api/endpoints'
import { catchErrorMessage } from '@/lib/error.message'

import { IUser } from '@/model/IUser'

import { AxiosResponse } from 'axios'
import type { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

function isTokenExpired(token: string) {
  const expiry = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString()
  ).exp
  return Math.floor(new Date().getTime() / 1000) >= expiry
}

async function refreshToken(jwt: JWT): Promise<JWT> {
  try {
    const res = await ApiClient.request({
      url: API.RefreshToken,
      method: 'POST',
      data: { refreshToken: jwt.refreshToken }
    })
    const data: IUser = res.data
    console.log({res})
    return data
  } catch (e) {
    return {
      ...jwt,
      error: 'RefreshTokenError'
    }
  }
}
export const options: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'text' }
      },
    
      async authorize(credentials) {
        console.log({credentials})
        try {
          if (credentials?.email && credentials?.password) {
            const { data }: AxiosResponse<any> = await ApiClient.request({
              url: API.Login,
              method: 'POST',
              data: {
                email: credentials?.email,
                password: credentials?.password,
                role:"USER",
              }
            })
            console.log("Login Data ", data);
            return data
          }
          return null
        } catch (error: any) {
          console.error('from authorize', error)
          if (error?.response.data) {
            throw new Error(catchErrorMessage(error))
          }
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }
      }

      if (isTokenExpired(token.accessToken as string)) {
        return await refreshToken(token)
      }
      return token
    },
    async session({ session, token }) {
      console.log(token)

      session.user = {
        ...session.user,
        ...token
      }
      return session
    }
  },

 
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/register'
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
  }
}
