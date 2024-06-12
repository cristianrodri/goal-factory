import ProductiveProcrastination from '@/lib/motivation-techniques/productive-procrastination/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    // Delete the item from the productive list
    const productiveProcrastination =
      await ProductiveProcrastination.findOneAndUpdateOrThrow(
        { user, 'productiveLists._id': params.id },
        {
          $pull: {
            productiveLists: {
              _id: params.id
            }
          }
        }
      )

    return successResponse(productiveProcrastination)
  }
)
