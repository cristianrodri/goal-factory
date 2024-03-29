import Aspiration from '@/lib/aspiration/model'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const DELETE = privateApi<unknown, { id: string }>(
  async (userId, { params }) => {
    // Add the user id to the class
    const data = await Aspiration.findOneAndDelete({
      user: userId,
      _id: params.id
    })

    return NextResponse.json(data)
  }
)
