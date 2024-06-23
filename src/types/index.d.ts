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

export interface IUserData {
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
export type AuthUser = UserClientId & Omit<UserData, 'password'>

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
interface IActivityAnalisys extends Document {
  activity: string
}

interface IFutureGoal extends Document {
  goal: string
}

interface IModerationFactor extends Document {
  factor: string
}

interface IModeratorFactorAlternative extends Document {
  alternative: string
}

interface IFacilitator extends Document {
  facilitator: string
}

interface IBigGoal {
  generalResult: string
  specificResult: string
  optimisticDeadline: Date
  realDeadline?: Date
  activityAnalysis: IActivityAnalisys[]
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
    1: IModerationFactor[]
    2: IModerationFactor[]
    3: IModerationFactor[]
    4: IModerationFactor[]
    5: IModerationFactor[]
    6: IModerationFactor[]
  }
  moderationFactorAlternatives: IModeratorFactorAlternative[]
  facilitators: {
    1: IFacilitator[]
    2: IFacilitator[]
    3: IFacilitator[]
    4: IFacilitator[]
  }
  goalWeeklyDay: WeekDay
  basicAspects: BasicAspects
  optimizingAspects: OptimizingAspects
  futureGoals: IFutureGoal[]
  bigReward: string
  rewardWasTaken: boolean
  achieved: boolean
  user: Schema.Types.ObjectId
}

/* Goal types */
interface IGoal {
  type: GoalType
  description: string
  startsOn: Date
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
  activities?: IActivity[]
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
  fallback?: string
  contingencies: Contingency[]
  diversionOrder?: number
  diversionIdeas?: string[]
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
interface ImpulseRate {
  description: string
  rate: number
  time: Date
}

interface IImpulse {
  videoLink: string
  rates: ImpulseRate[]
  isShown: boolean
  user: Schema.Types.ObjectId
}

/* Visual Prospective types */
interface ITimeReduceIdea extends Document {
  idea: string
}

interface IVisualProspective {
  goalAchievedDescription?: string
  specificDeadline?: Date
  thingTodoGoal?: string
  timeReduceIdeas: ITimeReduceIdea[]
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
interface ICommitment extends Document {
  commitment: string
}
interface IPreCommitment {
  preCommitments: ICommitment[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Reduce Alternative types */
interface IBurnedShip extends Document {
  burnedShip: string
}

interface IReduceAlternative {
  burnedShips: IBurnedShip[]
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
interface ExternalReminder {
  reminder: string
  impacts: {
    impact: number
    date: Date
  }[]
}

interface IInterruptionStimulus {
  externalReminders: ExternalReminder[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Productive Procrastination types */
interface IProductiveList extends Document {
  item: string
}

interface IProductiveProcrastination {
  productiveLists: IProductiveList[]
  user: Schema.Types.ObjectId
}

/* Distraction types */
interface IImpulsivity extends Document {
  impulsivity: string
  timeToDo: string
}

interface IDistractionItem extends Document {
  distraction: string
}

interface IDistraction {
  distractions: IDistractionItem[]
  impulsivities: IImpulsivity[]
  user: Schema.Types.ObjectId
}

/* Task Samurai types */
interface IBoredTask extends Document {
  task: string
  optimizing: string
}

interface ITaskSamurai {
  boredTasks: IBoredTask[]
  user: Schema.Types.ObjectId
}

/* Optimized Energy types */
interface IEnergyLevel {
  time: Date
  level: number
  reason: string
}

interface IEnergyConclusion extends Document {
  conclusion: string
}

interface IOptimizedEnergy {
  energyLevels: IEnergyLevel[]
  conclusions: IEnergyConclusion[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Purpose Passion types */
interface IDailyActivityPassion extends Document {
  activity: string
  enjoyment: number
}

interface IPurposePassion {
  dailyActivities: IDailyActivityPassion[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Total Structure Focus types */
interface IFocusIdea extends Document {
  idea: string
}

interface ITotalStructureFocus {
  focusIdeas: IFocusIdea[]
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

interface ITrustedPeople extends Document {
  name: string
}

/* Optimal Accountability types */
interface IOptimalAccountability {
  trustedPeople: ITrustedPeople[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Optimistic Level types */
interface IImprovement extends Document {
  description: string
}

interface IOptimisticLevel {
  improvements: IImprovement[]
  user: Schema.Types.ObjectId
  bigGoal: Schema.Types.ObjectId
}

/* Worst Context types */
interface IContingency extends Document {
  badScenario: string
  alternative: string
}

interface IWorstContext {
  contingencies: IContingency[]
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
