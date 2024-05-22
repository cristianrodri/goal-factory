import MotivationTechnique from '@/lib/motivation-technique/model'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface Body {
  isUsed: boolean
}

export const PUT = privateApi<Body, { ['technique-number']: string }>(
  async (user, { body, params }) => {
    const motivationTechnique = await MotivationTechnique.findOneAndUpdate(
      {
        user,
        realNumberTechnique: +params['technique-number']
      },
      { isUsed: body.isUsed },
      updateOptions
    )

    if (!motivationTechnique) {
      return errorResponse('Motivation technique not found', Status.NOT_FOUND)
    }

    return successResponse({ user, body, params })
  }
)
