import ReduceAlternative from '@/lib/motivation-techniques/reduce-alternative/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  editedBurnedShip: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, editedBurnedShip } = body

    const reduceAlternative = await ReduceAlternative.findOneOrThrow({
      user,
      bigGoal
    })

    const burnedShipFound = reduceAlternative.burnedShips.some(
      b => b.burnedShip === editedBurnedShip && b._id.toString() !== params.id
    )

    if (burnedShipFound) {
      return errorResponse('Burned ship already exists', Status.CONFLICT)
    }

    reduceAlternative.burnedShips = reduceAlternative.burnedShips.map(b => {
      if (b._id.toString() === params.id) {
        b.burnedShip = editedBurnedShip
      }

      return b
    })

    await reduceAlternative.save()

    return successResponse(reduceAlternative)
  }
)
