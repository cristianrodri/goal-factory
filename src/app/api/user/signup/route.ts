import { createUserMotivationTechniques } from '@/lib/motivation-technique/create'
import { createUserDependecy } from '@/lib/motivation-techniques/dependency/create'
import { createUserDistraction } from '@/lib/motivation-techniques/distraction/create'
import { createUserProductiveProcrastination } from '@/lib/motivation-techniques/productive-procrastination/create'
import { createUserTaskSamurai } from '@/lib/motivation-techniques/task-samurai/create'
import { createUser } from '@/lib/user/create'
import { IUserData } from '@/types'
import { publicApi } from '@/utils/api'
import { createTokenCookie } from '@/utils/cookie'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = publicApi<IUserData>(async ({ body }) => {
  const createdUser = await createUser(body)
  const token = createdUser.generateAuthToken()
  const userId = createdUser._id

  // Create motivation techniques related to the user
  await createUserMotivationTechniques(userId)

  await createUserDependecy(userId)
  await createUserDistraction(userId)
  await createUserProductiveProcrastination(userId)
  await createUserTaskSamurai(userId)

  createTokenCookie(token)

  return successResponse(createdUser, Status.CREATED)
})
