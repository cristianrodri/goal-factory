import Goal from '@/lib/goal/model'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const GET = privateApi<unknown, { id: string }>(
  async (userId, { params }) => {
    const data = await Goal.findOne({ user: userId, _id: params.id })

    return NextResponse.json(data)
  }
)
