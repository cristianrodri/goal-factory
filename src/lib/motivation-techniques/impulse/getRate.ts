import { CustomError } from '@/utils/error'

export const getRate = (req: Request) => {
  const url = new URL(req.url)
  const rateId = url.searchParams.get('rateId')

  if (!rateId) {
    throw new CustomError('Rate ID is required')
  }

  return rateId
}
