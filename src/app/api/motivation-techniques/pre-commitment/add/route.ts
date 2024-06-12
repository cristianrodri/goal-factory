import PreCommitment from '@/lib/motivation-techniques/pre-commitment/model'
import { ICommitment } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  commitment: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, commitment } = body

  if (!commitment) {
    return errorResponse('Commitment is required', Status.BAD_REQUEST)
  }

  const preCommitment = await PreCommitment.findOneOrThrow({ user, bigGoal })

  const foundSameCommitment = preCommitment.preCommitments.some(
    p => p.commitment === commitment
  )

  if (foundSameCommitment) {
    return errorResponse('Pre-commitment already exists', Status.CONFLICT)
  }

  preCommitment.preCommitments.push({ commitment } as ICommitment)

  await preCommitment.save()

  return successResponse(preCommitment, Status.CREATED)
})
