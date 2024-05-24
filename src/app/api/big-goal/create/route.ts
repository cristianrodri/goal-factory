import BigGoal from '@/lib/big-goal/model'
import { IBigGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi<Omit<IBigGoal, 'user'>>(
  async (user, { body }) => {
    const bigGoal = await BigGoal.create({ ...body, user })

    return successResponse(bigGoal, Status.CREATED)
  }
)
