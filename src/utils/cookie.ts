import { cookies } from 'next/headers'

export const createTokenCookie = (token: string) => {
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })
}

export const deleteTokenCookie = () => {
  cookies().delete('token')
}
