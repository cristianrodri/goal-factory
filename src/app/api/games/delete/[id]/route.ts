import Game from '@/lib/games/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const deletedGame = await Game.findOneAndDelete({ _id: params.id, user })

    if (!deletedGame) {
      return errorResponse('Game not found', Status.NOT_FOUND)
    }

    return successResponse(deletedGame)
  }
)
