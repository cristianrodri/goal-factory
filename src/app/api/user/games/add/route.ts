import Game from '@/lib/games/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface AddGames {
  games: string[]
}

export const POST = privateApi<AddGames>(async (user, { body }) => {
  const newGame = new Game(body)

  await newGame.save()

  return successResponse(newGame, Status.CREATED)
})
