import { IActivity } from '@/types'

export const checkActivitiesHaveFallback = (activities: IActivity[]) =>
  activities.every(activity => activity?.fallback)
