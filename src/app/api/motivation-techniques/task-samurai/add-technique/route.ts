import { createUserTaskSamurai } from '@/lib/motivation-techniques/task-samurai/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const taskSamurai = await createUserTaskSamurai(user)

  return successResponse(taskSamurai, Status.CREATED)
})
