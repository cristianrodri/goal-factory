import OptimalAccountability from '@/lib/motivation-techniques/optimal-accountability/model'
import { ITrustedPeople } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  editedPerson: string
  bigGoal: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { editedPerson, bigGoal } = body

    const optimalAccountability = await OptimalAccountability.findOneOrThrow({
      user,
      bigGoal
    })

    const samePersonFound = optimalAccountability.trustedPeople.some(
      p => p.name === editedPerson
    )

    if (samePersonFound) {
      return errorResponse('Person already exists', Status.CONFLICT)
    }

    optimalAccountability.trustedPeople =
      optimalAccountability.trustedPeople.map(p => {
        if (p._id.toString() === params.id) {
          return {
            ...p,
            name: editedPerson
          }
        }

        return p
      }) as ITrustedPeople[]

    await optimalAccountability.save()

    return successResponse(optimalAccountability)
  }
)
