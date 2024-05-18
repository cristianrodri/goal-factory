import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import dbConnect from '@/lib/dbConnect'
import { Status } from './enums'
import { getJWT } from './jwt'
import { CustomError, CustomErrorMongoose } from './error'
import { user } from './classes/User'

type BaseApiRequest<T> = {
  body: T
  req: Request
}

type AdditionalApiRequest<T, S> = BaseApiRequest<T> & {
  params: S
}

type ApiRequest<T, S = void> = S extends void
  ? BaseApiRequest<T>
  : AdditionalApiRequest<T, S>

type HandlerFnPublic<T, S> = (
  reqApi: ApiRequest<T, S>
) => Promise<NextResponse<unknown>>
type HandlerFnPrivate<T, K> = (
  userId: string,
  reqApi: ApiRequest<T, K>
) => Promise<NextResponse<unknown>>
type ApiType = 'public' | 'private'

// Public API middleware
export const publicApi =
  <T, K = void>(handler: HandlerFnPublic<T, K>) =>
  async (req: Request, url: { params: K }) => {
    // If the user is already logged in, don't let them navigating to the public APIs
    if (cookies().get('token')) {
      return NextResponse.json(
        { message: 'You are already logged in' },
        { status: Status.BAD_REQUEST }
      )
    }

    return await connectToDb<T, K>('public', req, url.params, handler)
  }

// Private API middleware
export const privateApi =
  <T, K = void>(handler: HandlerFnPrivate<T, K>) =>
  async (req: Request, url: { params: K }) => {
    // If the user is not logged in, don't let them access the private API
    if (!cookies().get('token')) {
      return NextResponse.json(
        { message: 'You are not logged in' },
        { status: Status.UNAUTHORIZED }
      )
    }

    return await connectToDb<T, K>('private', req, url.params, handler)
  }

// Connect to the database previous to executing the handler
export const connectToDb = async <T, K>(
  apiType: ApiType,
  req: Request,
  params: K,
  // Depending on the API type, the handler will receive different parameters (CHECK HERE)
  handler: HandlerFnPublic<T, K> | HandlerFnPrivate<T, K>
) => {
  try {
    const body =
      (req.method === 'POST' || req.method === 'PUT') &&
      !req.url.includes('api/user/logout')
        ? ((await req.json()) as T)
        : null

    if (req.method === 'POST' || req.method === 'PUT') {
      const reqBody = await req.json()

      // Remove properties that are not needed from the request body
      delete reqBody?.user
      delete reqBody?._id
      delete reqBody?.__v
      delete reqBody?.createdAt
      delete reqBody?.updatedAt
    }

    await dbConnect()

    if (apiType === 'private') {
      const token = cookies().get('token')
      const userId = token ? getJWT(token.value) : null

      // Set the user id, so the user id can be get by the user class
      user.setId(userId as string)

      return await (handler as HandlerFnPrivate<T, K>)(user.id, {
        body,
        req,
        params
      } as ApiRequest<T, K>)
    }

    return await (handler as HandlerFnPublic<T, K>)({
      body,
      req,
      params
    } as ApiRequest<T, K>)
  } catch (err) {
    const error = err as CustomError | CustomErrorMongoose

    const customError = new CustomError(error.message)

    return NextResponse.json(
      { message: customError.message },
      { status: error?.status ?? Status.BAD_REQUEST }
    )
  }
}
