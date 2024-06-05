import Game from '@/lib/game/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

interface UpdateGame {
  updatedGame: string
}

export const PUT = privateApi<UpdateGame, { id: string }>(
  async (user, { body, params }) => {
    const updatedGame = await Game.findOneAndUpdateOrThrow(
      { _id: params.id, user },
      body
    )

    return successResponse(updatedGame)
  }
)
