import { IImpulsivity } from '@/types'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

export const verifyBody = (body: {
  distraction?: string
  impulsivityData?: Partial<IImpulsivity>
}) => {
  if (!body?.distraction && !body?.impulsivityData) {
    throw new CustomError(
      'Request body must contain either a distraction or an impulsivity',
      Status.BAD_REQUEST
    )
  }
}
