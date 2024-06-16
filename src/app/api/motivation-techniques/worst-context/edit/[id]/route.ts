import WorstContext from '@/lib/motivation-techniques/worst-context/model'
import { IContingency } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  contingency: Partial<IContingency>
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, contingency } = body

    const worstContext = await WorstContext.findOneOrThrow({ user, bigGoal })

    const foundSameBadScenario = worstContext.contingencies.some(
      c =>
        c.badScenario === contingency.badScenario &&
        c._id.toString() !== params.id
    )

    if (foundSameBadScenario) {
      return errorResponse('Bad scenario already exists', Status.CONFLICT)
    }

    worstContext.contingencies = worstContext.contingencies.map(c => {
      if (c._id.toString() === params.id) {
        c.badScenario = contingency?.badScenario || c.badScenario
        c.alternative = contingency?.alternative || c.alternative
      }
      return c
    })

    await worstContext.save()

    return successResponse(worstContext)
  }
)
