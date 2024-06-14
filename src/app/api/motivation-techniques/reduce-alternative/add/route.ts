import ReduceAlternative from '@/lib/motivation-techniques/reduce-alternative/model'
import { IBurnedShip } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  burnedShip: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, burnedShip } = body

  const reduceAlternative = await ReduceAlternative.findOneOrThrow({
    user,
    bigGoal
  })

  const sameBurnedShip = reduceAlternative.burnedShips.some(
    b => b.burnedShip === burnedShip
  )

  if (sameBurnedShip) {
    return errorResponse('Burned ship already exists', Status.CONFLICT)
  }

  reduceAlternative.burnedShips.push({ burnedShip } as IBurnedShip)

  await reduceAlternative.save()

  return successResponse(reduceAlternative, Status.CREATED)
})
