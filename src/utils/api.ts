import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import dbConnect from '@/lib/dbConnect'
import { Status } from './enums'
import { getJWT } from './jwt'
import {
  CustomError,
  CustomErrorMongoose,
  formatValidationErrors
} from './error'
import { errorResponse } from './response'
import { Types } from 'mongoose'
import { removeUnwantedProperties } from './bodyRequest'

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
    const givenJson = req.headers.get('content-type')

    const body =
      (req.method === 'POST' || req.method === 'PUT') &&
      !req.url.includes('api/user/logout')
        ? givenJson?.includes('application/json')
          ? ((await req?.json()) as T)
          : ({} as T)
        : null

    if (req.method === 'POST' || req.method === 'PUT') {
      // Remove properties that are not needed from the request body
      const reqBody = body as Record<string, never>

      removeUnwantedProperties(reqBody)
    }

    await dbConnect()

    if (apiType === 'private') {
      const token = cookies().get('token')
      const userId = token ? getJWT(token.value) : null

      if (!Types.ObjectId.isValid(userId as string)) {
        throw new CustomError('Invalid user ID', Status.BAD_REQUEST)
      }

      return await (handler as HandlerFnPrivate<T, K>)(
        userId as string,
        {
          body,
          req,
          params
        } as ApiRequest<T, K>
      )
    }

    return await (handler as HandlerFnPublic<T, K>)({
      body,
      req,
      params
    } as ApiRequest<T, K>)
  } catch (err) {
    const error = err as CustomError

    const customError = new CustomError(error.message)
    const errorMessage =
      formatValidationErrors(error as CustomErrorMongoose) ??
      customError.message

    return errorResponse(errorMessage, error?.status ?? Status.BAD_REQUEST)
  }
}
