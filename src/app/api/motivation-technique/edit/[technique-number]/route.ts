import MotivationTechnique from '@/lib/motivation-technique/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

interface Body {
  isUsed: boolean
}

export const PUT = privateApi<Body, { ['technique-number']: string }>(
  async (user, { body, params }) => {
    const motivationTechnique =
      await MotivationTechnique.findOneAndUpdateOrThrow(
        {
          user,
          realNumberTechnique: +params['technique-number']
        },
        { isUsed: body.isUsed }
      )

    return successResponse(motivationTechnique)
  }
)
