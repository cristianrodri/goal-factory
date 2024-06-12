import ProductiveProcrastination from '@/lib/motivation-techniques/productive-procrastination/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  item: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { item } = body

  // Add the item to the productive list
  const productiveProcrastination =
    await ProductiveProcrastination.findOneOrThrow({ user })

  const sameItemFound = productiveProcrastination.productiveList.some(
    p => p.item === item
  )

  if (sameItemFound) {
    return errorResponse(
      'The item already exists for the user',
      Status.CONFLICT
    )
  }

  productiveProcrastination.productiveList.push({ item })

  await productiveProcrastination.save()

  return successResponse(productiveProcrastination, Status.CREATED)
})
