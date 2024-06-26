import {
  IActivityAnalisys,
  IBigGoal,
  IFactor,
  IFutureGoal,
  IModeratorFactorAlternative
} from '@/types'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

export type PropertyBigGoalArray = keyof Pick<
  IBigGoal,
  | 'activityAnalysis'
  | 'moderatingFactors'
  | 'moderationFactorAlternatives'
  | 'mediatingFactors'
  | 'futureGoals'
>

type Data = { num: number; factor: string }

export type DataBigGoalArray = string | Data

export const checkExistingItem = (
  bigGoal: IBigGoal,
  property: PropertyBigGoalArray,
  data: DataBigGoalArray
) => {
  // If the property is moderatingFactors
  if (property === 'moderatingFactors') {
    // Check if the moderationFactor already exists
    const moderatingFactorData = data as Data

    const foundFactor = bigGoal[property]
      .find(m => m.num === moderatingFactorData.num)
      ?.obstacles.some(
        moderatingFactor =>
          moderatingFactor.factor === moderatingFactorData.factor
      )

    if (foundFactor) {
      throw new CustomError(
        `Moderation factor already exists on factor #${moderatingFactorData.num}`,
        Status.CONFLICT
      )
    }
  }

  // If the property is mediating factors
  if (property === 'mediatingFactors') {
    // Check if the facilitator already exists
    const facilitatorData = data as Data

    const foundFacilitator = bigGoal[property]
      .find(f => f.num === facilitatorData.num)
      ?.facilitators.some(
        facilitator => facilitator.factor === facilitatorData.factor
      )

    if (foundFacilitator) {
      throw new CustomError(
        `Facilitator already exists on facilitator #${facilitatorData.num}`,
        Status.CONFLICT
      )
    }
  }

  // If the property is futureGoals
  if (property === 'futureGoals') {
    // Check if the future goal already exists
    const futureGoalData = data as string

    const foundFutureGoal = bigGoal[property].some(
      futureGoal => futureGoal.goal === futureGoalData
    )

    if (foundFutureGoal) {
      throw new CustomError(`Future goal already exists`, Status.CONFLICT)
    }
  }

  // If the property is activityAnalysis
  if (property === 'activityAnalysis') {
    // Check if the activity already exists
    const activityData = data as string

    const foundActivity = bigGoal[property].some(
      activity => activity.activity === activityData
    )

    if (foundActivity) {
      throw new CustomError(`Activity analysis already exists`, Status.CONFLICT)
    }
  }

  // If the property is moderationFactorAlternatives
  if (property === 'moderationFactorAlternatives') {
    // Check if the moderation factor alternative already exists
    const moderationFactorAlternativeData = data as string

    const foundModerationFactorAlternative = bigGoal[property].some(
      moderationFactorAlternative =>
        moderationFactorAlternative.alternative ===
        moderationFactorAlternativeData
    )

    if (foundModerationFactorAlternative) {
      throw new CustomError(
        `Moderation factor alternative already exists`,
        Status.CONFLICT
      )
    }
  }
}

export const addItem = (
  bigGoal: IBigGoal,
  property: PropertyBigGoalArray,
  data: DataBigGoalArray
) => {
  // If the property is moderatingFactors
  if (property === 'moderatingFactors') {
    // Add the moderation factor
    const moderatingData = data as Data

    bigGoal[property] = bigGoal[property].map(moderatingFactor => {
      if (moderatingFactor.num === moderatingData.num) {
        moderatingFactor.obstacles.push({
          factor: moderatingData.factor
        } as IFactor)
      }

      return moderatingFactor
    })
  }

  // If the property is mediating facilitators
  if (property === 'mediatingFactors') {
    // Add the mediating factor
    const mediatingData = data as Data

    bigGoal[property] = bigGoal[property].map(mediatingFactor => {
      if (mediatingFactor.num === mediatingData.num) {
        mediatingFactor.facilitators.push({
          factor: mediatingData.factor
        } as IFactor)
      }

      return mediatingFactor
    })
  }

  // If the property is futureGoals
  if (property === 'futureGoals') {
    // Add the future goal
    bigGoal[property].push({ goal: data } as IFutureGoal)
  }

  // If the property is activityAnalysis
  if (property === 'activityAnalysis') {
    // Add the activity analysis
    bigGoal[property].push({ activity: data } as IActivityAnalisys)
  }

  // If the property is moderationFactorAlternatives
  if (property === 'moderationFactorAlternatives') {
    // Add the moderation factor alternative
    bigGoal[property].push({ alternative: data } as IModeratorFactorAlternative)
  }
}
