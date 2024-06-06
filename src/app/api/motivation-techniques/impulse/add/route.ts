import Impulse from '@/lib/motivation-techniques/impulse/model'
import { IImpulse } from '@/types'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

type RequestBody = Omit<IImpulse, 'user'>

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const impulse = await Impulse.create({
    ...body,
    user
  })

  return successResponse(impulse)
})
