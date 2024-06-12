import ProductiveProcrastination from '@/lib/motivation-techniques/productive-procrastination/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  const productiveProcrastination =
    await ProductiveProcrastination.findOneOrThrow({ user })

  return successResponse(productiveProcrastination)
})
