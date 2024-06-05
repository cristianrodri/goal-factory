import Game from '@/lib/game/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface AddGame {
  game: string
}

export const POST = privateApi<AddGame>(async (user, { body }) => {
  const newGame = new Game({
    game: body.game,
    user
  })

  await newGame.save()

  return successResponse(newGame, Status.CREATED)
})
