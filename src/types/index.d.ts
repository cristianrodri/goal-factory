import { MotivationType, WeekDay } from '@/utils/enums'
import { Document, Schema } from 'mongoose'

/* User Data */
export interface UserDb {
  user: Schema.Types.ObjectId
}

export interface Game extends Document {
  game: string
}

export interface IRewardDescription extends Document {
  description: string
}

export interface UserData {
  username: string
  email: string
  password: string
  dayGame: WeekDay
}
export interface UserClientId {
  id: string
}

/* Reward types */
interface IReward {
  small: IRewardDescription[]
  medium: IRewardDescription[]
  user: Schema.Types.ObjectId
}

// Types used in the client side
export type AuthUser = ClientId & Omit<UserData, 'password'>

interface BasicAspects {
  1: boolean
  2: boolean
  3: boolean
  4: boolean
  5: boolean
}

interface OptimizingAspects {
  1: boolean
  2: boolean
  3: boolean
  4: boolean
  5: boolean
  6: boolean
  7: boolean
  8: boolean
  9: boolean
  10: boolean
}

interface Contingency {
  badScenario: string
  alternative: string
}

/* BigGoal types */
interface IBigGoal {
  generalResult: string
  specificResult: string
  realDeadline: Date
  optimisticDeadline: Date
  activityAnalysis: string[]
  activitiesFrecuency: string
  bigWhy: string
  expectation: string
  compromises: {
    1: boolean
    2: boolean
    3: boolean
    4: boolean
    5: boolean
    6: boolean
    7: boolean
  }
  moderatingFactors: {
    1: string[]
    2: string[]
    3: string[]
    4: string[]
    5: string[]
    6: string[]
  }
  moderationFactorAlternatives: string[]
  facilitators: {
    1: string[]
    2: string[]
    3: string[]
    4: string
  }
  goalWeeklyDay: WeekDay
  basicAspects: BasicAspects
  optimizingAspects: OptimizingAspects
  futureGoals: string[]
  bigReward: string
  rewardWasTaken: boolean
  achieved: boolean
  user: Schema.Types.ObjectId
}

/* Goal types */
interface IGoal {
  type: GoalType
  description: string
  optimisticDeadline: Date
  realDeadline: Date
  progress: number
  basicAspects: BasicAspects
  optimizingAspects: OptimizingAspects
  difficulty: number
  challenge: number
  specific: number
  directed: number
  immediate: number
  achieved: boolean
  parentGoal?: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

/* Activity types */
interface IActivity {
  description: string
  order: number
  days: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  fallback: string
  contingencies: Contingency[]
  diversionOrder: number
  diversionIdeas: string[]
  goal: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

/* Goal Dairy types */
interface IGoalDairy {
  date: Date
  activities: {
    activity: Schema.Types.ObjectId
    done: boolean
    description: string
  }[]
  conclusions: string[]
  improvements: string[]
  achievements: string[]
  reward: string
  rewardWasTaken: boolean
  bigGoal: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

/* Goal Weekly types */
interface IGoalWeekly {
  date: Date
  goals: IGoal[]
  weeklyProgress: number
  achievements: string[]
  reward: string
  rewardWasTaken: boolean
  bigGoal: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

/* Game types */
interface IGame {
  game: string
  user: Schema.Types.ObjectId
}

/* Motivation types */
interface IMotivationTechnique {
  realNumberTechnique: number
  type: MotivationType
  isUsed: boolean
  isApproved: boolean
  user: Schema.Types.ObjectId
  bigGoal?: Schema.Types.ObjectId
}

/* Motivation Calculation types */
interface IMotivationCalculation {
  expectation: number
  value: number
  impulsiveness: number
  time: number
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Motivation Technique models (not all 27 techniques will be modeled) */

/* Impulse types */
interface IImpulse {
  videoLink: string
  rates: [
    {
      description: string
      rate: number
      time: Date
    }
  ]
  isShown: boolean
  user: Schema.Types.ObjectId
}

/* Visual Prospective types */
interface IVisualProspective {
  goalAchievedDescription: string
  specificDeadline: Date
  thingTodoGoal: string
  timeReduceIdeas: string[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Automatic Habit types */

interface IUtilHabit extends Document {
  habit: string
  impact: number
}

interface IAutomaticHabit {
  utilHabits: IUtilHabit[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Pre Commitment types */
interface IPreCommitment {
  preCommitments: string[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Reduce Alternative types */
interface IReduceAlternative {
  burnedShips: string[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Contaminate Temptation types */
interface ITemptation extends Document {
  temptation: string
  catastrophe: string
}

interface IContaminateTemptation {
  temptations: ITemptation[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Interruption Stimulus types */
interface IInterruptionStimulus {
  externalReminders: {
    reminder: string
    impacts: {
      impact: number
      date: Date
    }[]
  }[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Productive Procrastination types */
interface IProductiveProcrastination {
  productiveList: string[]
  user: Schema.Types.ObjectId
}

/* Distraction types */
interface IDistraction {
  distractions: string[]
  impulsivities: {
    impulsivity: string
    timeToDo: string
  }[]
  user: Schema.Types.ObjectId
}

/* Task Samurai types */
interface ITaskSamurai {
  boredTasks: {
    task: string
    optimazing: string
  }[]
  user: Schema.Types.ObjectId
}

/* Optimized Energy types */
interface IOptimizedEnergy {
  energyLevels: {
    time: Date
    level: number
  }[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Purpose Passion types */
interface IPurposePassion {
  dailyActivities: {
    activity: string
    enjoyment: number
  }[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Total Structure Focus types */
interface ITotalStructureFocus {
  focusIdeas: string[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Dependency types */
interface IDependencyItem extends Document {
  dependency: string
}

interface IDependency {
  dependencies: IDependencyItem[]
  user: Schema.Types.ObjectId
}

/* Optimal Accountability types */
interface IOptimalAccountability {
  trustedPeople: string[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Optimistic Level types */
interface IOptimisticLevel {
  improvements: string[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Worst Context types */
interface IWorstContext {
  contingencies: {
    badScenario: string
    alternative: string
  }[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Motivation Book types */
interface IMotivationBook {
  date: Date
  activities: {
    activity: Schema.Types.ObjectId
    stability: number
    motivation: number
  }[]
  impulses: {
    impulse: Schema.Types.ObjectId
    rate: number
  }[]
  procrastinations: {
    procrastination: string
    cause: string
  }[]
  hasProgress: boolean
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Habit types */
interface IHabit {
  description: string
  days: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  user: Schema.Types.ObjectId
}

/* Habit Dairy types */
interface IHabitDairy {
  date: Date
  habits: {
    habit: Schema.Types.ObjectId
    description: string
    done: boolean
  }[]
  user: Schema.Types.ObjectId
}

/* Habit Weekly types */
interface IHabitWeekly {
  date: Date
  weeklyProgress: number
  user: Schema.Types.ObjectId
}
