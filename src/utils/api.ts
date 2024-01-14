import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import dbConnect from '@/lib/dbConnect'
import { Status } from './enums'
import { getJWT } from './jwt'
import { CustomError, CustomErrorMongoose } from './error'
import { user } from './classes/User'

type HandlerFnPublic<T> = (
  body: T,
  req: Request
) => Promise<NextResponse<unknown>>
type HandlerFnPrivate<T> = (
  userId: string,
  body: T,
  req: Request
) => Promise<NextResponse<unknown>>
type ApiType = 'public' | 'private'

// Public API middleware
export const publicApi =
  <T>(handler: HandlerFnPublic<T>) =>
  async (request: Request) => {
    // If the user is already logged in, don't let them navigating to the public APIs
    if (cookies().get('token')) {
      return NextResponse.json(
        { message: 'You are already logged in' },
        { status: Status.BAD_REQUEST }
      )
    }

    return await connectToDb<T>('public', request, handler)
  }

// Private API middleware
export const privateApi =
  <T>(handler: HandlerFnPrivate<T>) =>
  async (req: Request) => {
    // If the user is not logged in, don't let them access the private API
    if (!cookies().get('token')) {
      return NextResponse.json(
        { message: 'You are not logged in' },
        { status: Status.UNAUTHORIZED }
      )
    }

    return await connectToDb<T>('private', req, handler)
  }

// Connect to the database previous to executing the handler
export const connectToDb = async <T>(
  apiType: ApiType,
  req: Request,
  // Depending on the API type, the handler will receive different parameters (CHECK HERE)
  handler: HandlerFnPublic<T> | HandlerFnPrivate<T>
) => {
  try {
    const reqBody =
      (req.method === 'POST' || req.method === 'PUT') &&
      !req.url.includes('api/user/logout')
        ? ((await req.json()) as T)
        : null

    await dbConnect()

    if (apiType === 'private') {
      const token = cookies().get('token')
      const userId = token ? getJWT(token.value) : null

      // Set the user id, so the user id can be get by the user class
      user.setId(userId as string)

      // ERROR
      return await (handler as HandlerFnPrivate<T>)(user.id, reqBody as T, req)
    }

    // ERROR
    return await (handler as HandlerFnPublic<T>)(reqBody as T, req)
  } catch (err) {
    const error = err as CustomError | CustomErrorMongoose

    const customError = new CustomError(error.message)

    return NextResponse.json(
      { message: customError.message },
      { status: error?.status ?? Status.BAD_REQUEST }
    )
  }
}
