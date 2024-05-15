import User from '@/lib/user/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface AddGames {
  games: string[]
}

export const POST = privateApi<AddGames>(async (user, { body }) => {
  const loggedUser = await User.findById(user)

  if (!loggedUser) {
    return errorResponse('User not found', Status.NOT_FOUND)
  }

  loggedUser.games.push(...body.games)

  await loggedUser.save()

  return successResponse(loggedUser)
})
