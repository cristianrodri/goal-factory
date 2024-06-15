import TaskSamurai from '@/lib/motivation-techniques/task-samurai/model'
import { IBoredTask } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  boredTask: IBoredTask
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { boredTask } = body

  // Add the task to the user's task samurai
  const taskSamurai = await TaskSamurai.findOneOrThrow({ user })

  const foundSameTask = taskSamurai.boredTasks.some(
    b => b.task === boredTask.task
  )

  if (foundSameTask) {
    return errorResponse('Task already exists', Status.CONFLICT)
  }

  taskSamurai.boredTasks.push(boredTask)

  await taskSamurai.save()

  return successResponse(taskSamurai, Status.CREATED)
})
