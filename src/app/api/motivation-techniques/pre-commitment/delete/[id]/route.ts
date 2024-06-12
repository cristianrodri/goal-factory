import PreCommitment from '@/lib/motivation-techniques/pre-commitment/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    // Delete pre-commitment by id
    const preCommitment = await PreCommitment.findOneAndUpdateOrThrow(
      { user, 'preCommitments._id': params.id },
      {
        $pull: { preCommitments: { _id: params.id } }
      }
    )

    return successResponse(preCommitment)
  }
)
