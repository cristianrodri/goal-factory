import TaskSamurai from '@/lib/motivation-techniques/task-samurai/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    // Delete the task from the user's task samurai
    const taskSamurai = await TaskSamurai.findOneAndUpdateOrThrow(
      { user, 'boredTasks._id': params.id },
      {
        $pull: {
          boredTasks: {
            _id: params.id
          }
        }
      }
    )

    return successResponse(taskSamurai)
  }
)
