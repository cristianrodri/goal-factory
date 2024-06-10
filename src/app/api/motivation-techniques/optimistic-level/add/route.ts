import OptimisticLevel from '@/lib/motivation-techniques/optimistic-level/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  improvementDescription: string
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { improvementDescription, bigGoal } = body

  // Add the improvement to the optimistic level
  const optimisticLevel = await OptimisticLevel.findOneOrThrow({
    user,
    bigGoal
  })

  const foundSameDescription = optimisticLevel.improvements.some(
    i => i.description === improvementDescription
  )

  if (foundSameDescription) {
    return errorResponse('Improvement already exists.', Status.CONFLICT)
  }

  optimisticLevel.improvements.push({ description: improvementDescription })

  await optimisticLevel.save()

  return successResponse(optimisticLevel, Status.CREATED)
})
