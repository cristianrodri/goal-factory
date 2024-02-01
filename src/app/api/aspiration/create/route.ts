import Aspiration from '@/lib/aspiration/model'
import { IAspiration } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const POST = privateApi<Omit<IAspiration, 'user'>>(
  async (userId, { body }) => {
    const aspiration = new Aspiration({
      ...body,
      reached: false,
      progress: 0,
      user: userId
    })

    const createdAspiration = await aspiration.save()

    return NextResponse.json(createdAspiration, {
      status: Status.CREATED
    })
  }
)
