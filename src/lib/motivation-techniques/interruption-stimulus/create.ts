import InterruptionStimulus from './model'

export const createGoalInterruptionStimulus = async (
  user: string,
  bigGoal: string
) => {
  const interruptionStimulus = await InterruptionStimulus.create({
    user,
    bigGoal,
    externalReminders: []
  })

  return interruptionStimulus
}
