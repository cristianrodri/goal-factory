import {
  IActivityAnalisys,
  IBigGoal,
  IFacilitator,
  IFutureGoal,
  IModerationFactor,
  IModeratorFactorAlternative
} from '@/types'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

export type PropertyBigGoalArray = keyof Pick<
  IBigGoal,
  | 'activityAnalysis'
  | 'moderatingFactors'
  | 'moderationFactorAlternatives'
  | 'facilitators'
  | 'futureGoals'
>

export type DataBigGoalArray = string | IModerationFactor | IFacilitator

export const checkExistingItem = (
  bigGoal: IBigGoal,
  property: PropertyBigGoalArray,
  data: DataBigGoalArray
) => {
  // If the property is moderatingFactors
  if (property === 'moderatingFactors') {
    // Check if the moderationFactor already exists
    const moderatingFactorData = data as IModerationFactor

    const foundFactor = bigGoal[property]
      .filter(m => m.num === moderatingFactorData.num)
      .some(
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

  // If the property is facilitators
  if (property === 'facilitators') {
    // Check if the facilitator already exists
    const facilitatorData = data as IFacilitator

    const foundFacilitator = bigGoal[property]
      .filter(f => f.num === facilitatorData.num)
      .some(
        facilitator => facilitator.facilitator === facilitatorData.facilitator
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
    bigGoal[property].push(data as IModerationFactor)
  }

  // If the property is facilitators
  if (property === 'facilitators') {
    // Add the facilitator
    bigGoal[property].push(data as IFacilitator)
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
