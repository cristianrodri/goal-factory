import { privateApi } from '@/utils/api'
import { errorResponse, successResponse } from '@/utils/response'
import Dependency from '@/lib/motivation-techniques/dependency/model'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const userDependency = await Dependency.findOneAndUpdate(
      {
        user,
        'dependencies._id': params.id
      },
      {
        $pull: {
          dependencies: { _id: params.id }
        }
      },
      updateOptions
    )

    if (!userDependency) {
      return errorResponse('Dependency not found', Status.NOT_FOUND)
    }
    return successResponse(userDependency)
  }
)
