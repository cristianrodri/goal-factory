/* eslint-disable @typescript-eslint/no-explicit-any */
import MotivationTechnique from '@/lib/motivation-technique/model'
import { getMotivationTechniques } from '@/lib/user/getMotivationTechniques'
import { privateApi } from '@/utils/api'
import { MotivationType } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async userId => {
  const { user, techniques } = await getMotivationTechniques(userId)

  // Prepare bulk operations
  const bulkOps = techniques.map(({ realNumberTechnique, isApproved }) => ({
    updateOne: {
      filter: { user: userId, realNumberTechnique },
      update: { $set: { isApproved } },
      upsert: true // Use upsert if you want to insert the document if it doesn't exist
    }
  }))

  // Bulk write the operations
  await MotivationTechnique.bulkWrite(bulkOps as any)

  const motivationTechniques = await MotivationTechnique.find({
    user: userId,
    type: MotivationType.PER_USER
  })

  return successResponse({ user, motivationTechniques })
})
