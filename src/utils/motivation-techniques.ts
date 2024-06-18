import { MotivationType, TechniqueNumber } from './enums'

type MotivationTechnique = {
  realNumberTechinque: number
  type: MotivationType
}

// This is a list of motivation techniques
const {
  SCALABLE_LOOP,
  USER_IMPULSE,
  GOAL_VISUAL_PROSPECTY,
  GOAL_OPTIMISTIC_LEVEL,
  GOAL_WORST_CONTEXT,
  USER_DEPENDENCY,
  GOAL_OPTIMAL_ACCOUNTABILITY,
  TASK_CALIBRATION,
  GOAL_PURPOSE_PASSION,
  GOAL_TOTAL_STRUCTURE_FOCUS,
  GOAL_REDI,
  ENJOYABLE_PRODUCTIVITY,
  USER_TASK_SAMURAI,
  GOAL_OPTIMIZED_ENERGY,
  USER_PRODUCTIVE_PROCRASTINATION,
  REWARD,
  EXCHANGE_ACTIVITIES,
  USER_DISTRACTION_LIMITATION,
  GOAL_CONTAMINATE_TEMPTATION,
  GOAL_INTERRUPTION_STIMULUS,
  GOAL_PRECOMMITMENT,
  GOAL_REDUCE_ALTERNATIVE,
  GOAL_AUTOMATIC_HABIT,
  GAME,
  TASK_DISTRIBUTION_MODEL,
  ADVANCE_PROGRESS_OBJECTIVES,
  FALACE_MENTAL_PROJECTION
} = TechniqueNumber

export const motivationTechniques: MotivationTechnique[] = [
  { realNumberTechinque: SCALABLE_LOOP, type: MotivationType.PER_GOAL },
  { realNumberTechinque: USER_IMPULSE, type: MotivationType.PER_USER },
  { realNumberTechinque: GOAL_VISUAL_PROSPECTY, type: MotivationType.PER_GOAL },
  { realNumberTechinque: GOAL_OPTIMISTIC_LEVEL, type: MotivationType.PER_GOAL },
  { realNumberTechinque: GOAL_WORST_CONTEXT, type: MotivationType.PER_GOAL },
  { realNumberTechinque: USER_DEPENDENCY, type: MotivationType.PER_USER },
  {
    realNumberTechinque: GOAL_OPTIMAL_ACCOUNTABILITY,
    type: MotivationType.PER_GOAL
  },
  { realNumberTechinque: TASK_CALIBRATION, type: MotivationType.PER_GOAL },
  { realNumberTechinque: GOAL_PURPOSE_PASSION, type: MotivationType.PER_GOAL },
  {
    realNumberTechinque: GOAL_TOTAL_STRUCTURE_FOCUS,
    type: MotivationType.PER_GOAL
  },
  { realNumberTechinque: GOAL_REDI, type: MotivationType.PER_GOAL },
  {
    realNumberTechinque: ENJOYABLE_PRODUCTIVITY,
    type: MotivationType.PER_GOAL
  },
  { realNumberTechinque: USER_TASK_SAMURAI, type: MotivationType.PER_USER },
  { realNumberTechinque: GOAL_OPTIMIZED_ENERGY, type: MotivationType.PER_GOAL },
  {
    realNumberTechinque: USER_PRODUCTIVE_PROCRASTINATION,
    type: MotivationType.PER_USER
  },
  { realNumberTechinque: REWARD, type: MotivationType.PER_USER },
  { realNumberTechinque: EXCHANGE_ACTIVITIES, type: MotivationType.PER_GOAL },
  {
    realNumberTechinque: USER_DISTRACTION_LIMITATION,
    type: MotivationType.PER_USER
  },
  {
    realNumberTechinque: GOAL_CONTAMINATE_TEMPTATION,
    type: MotivationType.PER_GOAL
  },
  {
    realNumberTechinque: GOAL_INTERRUPTION_STIMULUS,
    type: MotivationType.PER_GOAL
  },
  { realNumberTechinque: GOAL_PRECOMMITMENT, type: MotivationType.PER_GOAL },
  {
    realNumberTechinque: GOAL_REDUCE_ALTERNATIVE,
    type: MotivationType.PER_GOAL
  },
  { realNumberTechinque: GOAL_AUTOMATIC_HABIT, type: MotivationType.PER_GOAL },
  { realNumberTechinque: GAME, type: MotivationType.PER_USER },
  {
    realNumberTechinque: TASK_DISTRIBUTION_MODEL,
    type: MotivationType.PER_GOAL
  },
  {
    realNumberTechinque: ADVANCE_PROGRESS_OBJECTIVES,
    type: MotivationType.PER_GOAL
  },
  {
    realNumberTechinque: FALACE_MENTAL_PROJECTION,
    type: MotivationType.PER_GOAL
  }
]
