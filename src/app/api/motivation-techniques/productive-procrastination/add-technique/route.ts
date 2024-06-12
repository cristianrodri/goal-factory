import { createUserProductiveProcrastination } from '@/lib/motivation-techniques/productive-procrastination/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const productiveProcrastination =
    await createUserProductiveProcrastination(user)

  return successResponse(productiveProcrastination, Status.CREATED)
})
