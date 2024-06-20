import { IOptimizedEnergy } from '@/types'
import moment from 'moment'

export const optimizedEnergyIsPassed = (optimizedEnergy: IOptimizedEnergy) => {
  const sortedEnergyLevels = optimizedEnergy.energyLevels.sort(
    // sort by oldest date
    (a, b) => moment(a.time).diff(moment(b.time))
  )

  const lastEnergyLevelDate = moment(sortedEnergyLevels[0].time)

  const daysDiff = moment().diff(lastEnergyLevelDate, 'days')

  if (daysDiff < 7) {
    return false
  }

  const conclusionsLength = optimizedEnergy.conclusions.length

  return conclusionsLength > 4
}
