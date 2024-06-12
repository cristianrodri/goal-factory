import ProductiveProcrastination from '@/lib/motivation-techniques/productive-procrastination/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  editedItem: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { editedItem } = body

    const productiveProcrastination =
      await ProductiveProcrastination.findOneOrThrow({ user })

    const sameItemFound = productiveProcrastination.productiveLists.some(
      p => p.item === editedItem && p._id.toString() !== params.id
    )

    if (sameItemFound) {
      return errorResponse(
        'The item already exists for the user',
        Status.CONFLICT
      )
    }

    productiveProcrastination.productiveLists =
      productiveProcrastination.productiveLists.map(p => {
        if (p._id.toString() === params.id) {
          p.item = editedItem
        }

        return p
      })

    await productiveProcrastination.save()

    return successResponse(productiveProcrastination)
  }
)
