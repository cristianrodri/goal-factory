import PreCommitment from '@/lib/motivation-techniques/pre-commitment/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  editCommitment: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, editCommitment } = body

    if (!editCommitment) {
      return errorResponse('Commitment is required', Status.BAD_REQUEST)
    }

    const preCommitment = await PreCommitment.findOneOrThrow({ user, bigGoal })

    const foundSameCommitment = preCommitment.preCommitments.some(
      p => p.commitment === editCommitment && p._id.toString() !== params.id
    )

    if (foundSameCommitment) {
      return errorResponse('Pre-commitment already exists', Status.CONFLICT)
    }

    preCommitment.preCommitments = preCommitment.preCommitments.map(p => {
      if (p._id.toString() === params.id) {
        p.commitment = editCommitment
      }

      return p
    })

    await preCommitment.save()

    return successResponse(preCommitment)
  }
)
