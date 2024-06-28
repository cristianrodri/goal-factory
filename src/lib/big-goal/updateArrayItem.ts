import { CustomError } from '@/utils/error'
import { Data, ParametersTuple } from './addArrayItem'
import { Status } from '@/utils/enums'

export const updateItem = (id: string, ...args: ParametersTuple) => {
  const [bigGoal, property, data] = args

  // If the property is moderatingFactors
  if (property === 'moderatingFactors') {
    // Update the moderation factor
    const moderatingData = data as Data

    const foundSameFactor = bigGoal[property]
      .filter(m => m.num === moderatingData.num)
      .some(moderatingFactor =>
        moderatingFactor.obstacles.some(
          obstacle =>
            obstacle.factor === moderatingData.factor &&
            obstacle._id.toString() !== id
        )
      )

    if (foundSameFactor) {
      throw new CustomError(
        `Moderation factor already exists on factor #${moderatingData.num}`,
        Status.CONFLICT
      )
    }

    bigGoal[property] = bigGoal[property].map(moderatingFactor => {
      if (moderatingFactor.num === moderatingData.num) {
        moderatingFactor.obstacles = moderatingFactor.obstacles.map(
          obstacle => {
            if (id === obstacle._id.toString()) {
              obstacle.factor = moderatingData.factor
            }

            return obstacle
          }
        )
      }

      return moderatingFactor
    })
  }

  // If the property is mediating facilitators
  if (property === 'mediatingFactors') {
    // Update the mediating factor
    const mediatingData = data as Data

    const foundSameFactor = bigGoal[property]
      .filter(m => m.num === mediatingData.num)
      .some(mediatingFactor =>
        mediatingFactor.facilitators.some(
          facilitator =>
            facilitator.factor === mediatingData.factor &&
            facilitator._id.toString() !== id
        )
      )

    if (foundSameFactor) {
      throw new CustomError(
        `Facilitator already exists on facilitator #${mediatingData.num}`,
        Status.CONFLICT
      )
    }

    bigGoal[property] = bigGoal[property].map(mediatingFactor => {
      if (mediatingFactor.num === mediatingData.num) {
        mediatingFactor.facilitators = mediatingFactor.facilitators.map(
          facilitator => {
            if (id === facilitator._id.toString()) {
              facilitator.factor = mediatingData.factor
            }

            return facilitator
          }
        )
      }

      return mediatingFactor
    })
  }

  // If the property is futureGoals
  if (property === 'futureGoals') {
    const foundFutureGoal = bigGoal[property].some(
      g => g.goal === data && g._id.toString() !== id
    )

    if (foundFutureGoal) {
      throw new CustomError(`Future goal already exists`, Status.CONFLICT)
    }

    // Update the future goal
    bigGoal[property] = bigGoal[property].map(futureGoal => {
      if (id === futureGoal._id.toString()) {
        futureGoal.goal = data as string
      }

      return futureGoal
    })
  }

  // If the property is activityAnalysis
  if (property === 'activityAnalysis') {
    const foundActivity = bigGoal[property].some(
      a => a.activity === data && a._id.toString() !== id
    )

    if (foundActivity) {
      throw new CustomError(`Activity analysis already exists`, Status.CONFLICT)
    }

    // Update the activity analysis
    bigGoal[property] = bigGoal[property].map(activity => {
      if (id === activity._id.toString()) {
        activity.activity = data as string
      }

      return activity
    })
  }

  // If the property is moderationFactorAlternatives
  if (property === 'moderationFactorAlternatives') {
    const foundModerationFactorAlternative = bigGoal[property].some(
      m => m.alternative === data && m._id.toString() !== id
    )

    if (foundModerationFactorAlternative) {
      throw new CustomError(
        `Moderation factor alternative already exists`,
        Status.CONFLICT
      )
    }

    // Update the moderation factor alternative
    bigGoal[property] = bigGoal[property].map(moderationFactorAlternative => {
      if (id === moderationFactorAlternative._id.toString()) {
        moderationFactorAlternative.alternative = data as string
      }

      return moderationFactorAlternative
    })
  }
}
