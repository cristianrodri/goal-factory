import TaskSamurai from '@/lib/motivation-techniques/task-samurai/model'
import { IBoredTask } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  boredTask: Partial<IBoredTask>
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { boredTask } = body

    // Add the task to the user's task samurai
    const taskSamurai = await TaskSamurai.findOneOrThrow({ user })

    const foundSameTask = taskSamurai.boredTasks.some(
      b => b.task === boredTask.task && b._id.toString() !== params.id
    )

    if (foundSameTask) {
      return errorResponse('Task already exists', Status.CONFLICT)
    }

    taskSamurai.boredTasks = taskSamurai.boredTasks.map(b => {
      if (b._id.toString() === params.id) {
        b.task = boredTask.task || b.task
        b.optimizing = boredTask.optimizing || b.optimizing
      }

      return b
    })

    await taskSamurai.save()

    return successResponse(taskSamurai)
  }
)
