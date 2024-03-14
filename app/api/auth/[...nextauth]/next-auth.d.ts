import 'next-auth'
import 'next-auth/jwt'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string
      refreshToken: string
      userInfo: {
        fullName: string
        email: string
        phoneNumber: string
        address: string
        profilePicture: string
        _id: string
      }
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {}
}
