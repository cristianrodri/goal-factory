import { ITimeReduceIdea, IVisualProspective } from '@/types'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

export interface VisualProspectiveAdd
  extends Omit<IVisualProspective, 'user' | 'timeReduceIdeas'> {
  timeReduceIdea: string
}

export interface VisualProspectiveEdit
  extends Omit<IVisualProspective, 'user' | 'timeReduceIdeas'> {
  timeReduceIdea: string
  timeReduceIdeaId: string
}

export interface RequestBodyVisualProspective {
  visualProspective: Omit<IVisualProspective, 'user' | 'timeReduceIdeas'> & {
    timeReduceIdea: string
  }
}

const addData = (
  visualProspective: IVisualProspective,
  visualProspectiveBody: VisualProspectiveAdd
) => {
  const { goalAchievedDescription, specificDeadline, thingTodoGoal } =
    visualProspectiveBody

  if (goalAchievedDescription) {
    visualProspective.goalAchievedDescription = goalAchievedDescription
  }

  if (specificDeadline) {
    visualProspective.specificDeadline = specificDeadline
  }

  if (thingTodoGoal) {
    visualProspective.thingTodoGoal = thingTodoGoal
  }
}

export const addDataToVisualProspective = (
  visualProspective: IVisualProspective,
  visualProspectiveBody: VisualProspectiveAdd
) => {
  addData(visualProspective, visualProspectiveBody)

  const { timeReduceIdea } = visualProspectiveBody

  if (timeReduceIdea) {
    const foundSameIdea = visualProspective.timeReduceIdeas.some(
      t => t.idea === timeReduceIdea
    )

    if (foundSameIdea) {
      throw new CustomError('Time reduce idea already exists', Status.CONFLICT)
    }

    visualProspective.timeReduceIdeas.push({
      idea: timeReduceIdea
    } as ITimeReduceIdea)
  }
}

export const updateDataOfVisualProspective = (
  visualProspective: IVisualProspective,
  visualProspectiveBody: VisualProspectiveEdit
) => {
  addData(visualProspective, visualProspectiveBody)

  const { timeReduceIdea, timeReduceIdeaId } = visualProspectiveBody

  if (timeReduceIdea) {
    const foundSameIdea = visualProspective.timeReduceIdeas.some(
      t => t.idea === timeReduceIdea && t._id.toString() !== timeReduceIdeaId
    )

    if (foundSameIdea) {
      throw new CustomError('Time reduce idea already exists', Status.CONFLICT)
    }

    visualProspective.timeReduceIdeas = visualProspective.timeReduceIdeas.map(
      t => {
        if (t._id.toString() === timeReduceIdeaId) {
          t.idea = timeReduceIdea
        }

        return t
      }
    )
  }
}
