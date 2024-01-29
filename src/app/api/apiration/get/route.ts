import Aspiration from '@/lib/aspiration/model'
import { IGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const GET = privateApi(async userId => {
  // Add the user id to the class
  const data = await Aspiration.find({ user: userId }).populate<{
    goals: IGoal[]
  }>({
    path: 'goals',
    populate: 'activities'
  })

  return NextResponse.json(data)
})
