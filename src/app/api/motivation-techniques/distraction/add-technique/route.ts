import { createUserDistraction } from '@/lib/motivation-techniques/distraction/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const userDistraction = await createUserDistraction(user)

  return successResponse(userDistraction, Status.CREATED)
})
