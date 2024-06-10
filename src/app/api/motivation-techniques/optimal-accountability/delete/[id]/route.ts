import OptimalAccountability from '@/lib/motivation-techniques/optimal-accountability/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const optimalAccountability =
      await OptimalAccountability.findOneAndUpdateOrThrow(
        {
          user,
          'trustedPeople._id': params.id
        },
        {
          $pull: {
            trustedPeople: {
              _id: params.id
            }
          }
        }
      )

    return successResponse(optimalAccountability)
  }
)
