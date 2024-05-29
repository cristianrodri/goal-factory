import Dependency from '@/lib/motivation-techniques/dependency/model'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  editedDependency: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { editedDependency } = body

    const previousDependency = await Dependency.findOne({
      user
    })

    const dependencyWithEqualName = previousDependency?.dependencies.some(
      d => d._id.toString() !== params.id && d.dependency === editedDependency
    )

    if (dependencyWithEqualName) {
      return errorResponse('Dependency already exists', Status.CONFLICT)
    }

    const updatedDependency = await Dependency.findOneAndUpdate(
      {
        user,
        'dependencies._id': params.id
      },
      {
        $set: {
          'dependencies.$.dependency': editedDependency
        }
      },
      updateOptions
    )

    if (!updatedDependency) {
      return errorResponse('Dependency not found', Status.NOT_FOUND)
    }

    return successResponse(updatedDependency)
  }
)
