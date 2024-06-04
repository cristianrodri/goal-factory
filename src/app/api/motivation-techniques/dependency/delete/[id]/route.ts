import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'
import Dependency from '@/lib/motivation-techniques/dependency/model'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const userDependency = await Dependency.findOneAndUpdateOrThrow(
      {
        user,
        'dependencies._id': params.id
      },
      {
        $pull: {
          dependencies: { _id: params.id }
        }
      }
    )

    return successResponse(userDependency)
  }
)
