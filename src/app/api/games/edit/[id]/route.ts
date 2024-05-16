import Game from '@/lib/games/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface UpdateGame {
  updatedGame: string
}

export const PUT = privateApi<UpdateGame, { id: string }>(
  async (user, { body, params }) => {
    const updatedGame = await Game.findOneAndUpdate(
      { _id: params.id, user },
      body,
      {
        new: true
      }
    )

    if (!updatedGame) {
      return errorResponse('Game not found', Status.NOT_FOUND)
    }

    return successResponse(updatedGame)
  }
)
