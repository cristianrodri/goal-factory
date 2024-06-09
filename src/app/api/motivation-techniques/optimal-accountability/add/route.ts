import OptimalAccountability from '@/lib/motivation-techniques/optimal-accountability/model'
import { ITrustedPeople } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  person: string
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { person, bigGoal } = body

  const optimalAccountability = await OptimalAccountability.findOneOrThrow({
    user,
    bigGoal
  })

  // Check if the given person is already in the trusted people list
  if (optimalAccountability.trustedPeople.some(p => p.name === person)) {
    return errorResponse(
      `${person} is already in the trusted people list.`,
      Status.CONFLICT
    )
  }

  optimalAccountability.trustedPeople.push({ name: person } as ITrustedPeople)

  await optimalAccountability.save()

  return successResponse(optimalAccountability, Status.CREATED)
})
