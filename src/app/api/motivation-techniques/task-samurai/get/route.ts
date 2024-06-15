import TaskSamurai from '@/lib/motivation-techniques/task-samurai/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  const taskSamurai = await TaskSamurai.findOneOrThrow({ user })

  return successResponse(taskSamurai)
})
