import Aspiration from '@/lib/aspiration/model'
import { IAspiration } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const PUT = privateApi<Omit<IAspiration, 'user'>, { id: string }>(
  async (userId, { body, params }) => {
    const aspiration = await Aspiration.findOneAndUpdate(
      { user: userId, _id: params.id },
      {
        ...body,
        user: userId
      },
      { new: true }
    )

    return NextResponse.json(aspiration, {
      status: Status.CREATED
    })
  }
)
