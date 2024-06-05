import Game from '@/lib/game/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const deletedGame = await Game.findOneAndDeleteOrThrow({
      _id: params.id,
      user
    })

    return successResponse(deletedGame)
  }
)
