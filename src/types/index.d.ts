import { MotivationType, REWARD, WeekDay } from '@/utils/enums'

/* User Data */
export interface UserDb {
  user: Schema.Types.ObjectId
}

export interface UserData {
  username: string
  email: string
  password: string
  dayGame: WeekDay
  games: string[]
}
export interface UserClientId {
  id: string
}

// Types used in the client side
export type AuthUser = ClientId & Omit<UserData, 'password'>

/* BigGoal types */
interface IBigGoal {
  generalResult: string
  specificResult: string
  deadline: Date
  reached: boolean
  bigReward: string
  progress: number
  user: Schema.Types.ObjectId
}

/* Goal types */
interface IGoal {
  type: GoalType
  description: string
  deadline: Date
  active: boolean
  reached: boolean
  progress: number
  order: number
  goal: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

/* Activity types */
interface IActivity {
  description: string
  order: number
  done: boolean
  repeat: boolean
  days: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  goal: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

/* Goal Dairy types */
interface IGoalDairy {
  activities: IActivity[]
  contingences: string[]
  alternativeStrategies: string[]
  conclusions: string[]
  improvements: string[]
  achievements: string[]
  reward: string
  date: Date
  goal: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

/* Goal Weekly types */
interface IGoalWeekly {
  goals: IGoal[]
  weeklyProgress: number
  achievements: string[]
  reward: string
  bigGoal: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

/* Reward types */
interface IReward {
  type: REWARD
  rewards: string[]
  user: Schema.Types.ObjectId
}

/* Motivation types */
interface IMotivationTechnique {
  realNumberTechnique: number
  type: MotivationType
  isUsed: boolean
  isApproved: boolean
  user: Schema.Types.ObjectId
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
interface IAutomaticHabit {
  utilHabits: {
    habit: string
    impact: number
  }[]
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
interface IContaminateTemptation {
  temptations: {
    temptation: string
    catastrophe: string
  }[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}
