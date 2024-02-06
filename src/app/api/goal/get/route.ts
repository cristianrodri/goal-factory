import Goal from '@/lib/goal/model'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const GET = privateApi(async (userId, { req }) => {
  const { searchParams } = new URL(req.url)
  const aspiration = searchParams.get('aspiration')?.trim()
  const parentGoal = searchParams.get('parentGoal')?.trim()

  const data = await Goal.find({
    user: userId,
    aspiration,
    ...(parentGoal ? { goal: parentGoal } : {})
  })

  return NextResponse.json(data)
})
