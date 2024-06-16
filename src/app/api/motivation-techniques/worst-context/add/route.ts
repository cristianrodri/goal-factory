import WorstContext from '@/lib/motivation-techniques/worst-context/model'
import { IContingency } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  contingency: IContingency
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, contingency } = body

  const worstContext = await WorstContext.findOneOrThrow({ user, bigGoal })

  const foundSameBadScenario = worstContext.contingencies.some(
    c => c.badScenario === contingency.badScenario
  )

  if (foundSameBadScenario) {
    return errorResponse('Bad scenario already exists', Status.CONFLICT)
  }

  worstContext.contingencies.push(contingency)

  await worstContext.save()

  return successResponse(worstContext, Status.CREATED)
})
