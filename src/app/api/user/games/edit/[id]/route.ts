import User from '@/lib/user/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface UpdateGame {
  updatedGame: string
}

export const PUT = privateApi<UpdateGame, { id: string }>(
  async (user, { body, params }) => {
    const loggedUser = await User.findById(user)

    if (!loggedUser) {
      return errorResponse('User not found', Status.NOT_FOUND)
    }

    loggedUser.games.map(game => {
      if (game._id.toString() === params.id) {
        game.game = body.updatedGame
      }

      return game
    })

    await loggedUser.save()

    return successResponse(loggedUser)
  }
)
