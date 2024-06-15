import { ITimeReduceIdea, IVisualProspective } from '@/types'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

export interface RequestBodyVisualProspective {
  visualProspective: Omit<IVisualProspective, 'user' | 'timeReduceIdeas'> & {
    timeReduceIdea: string
  }
}

const addData = (
  visualProspective: IVisualProspective,
  body: RequestBodyVisualProspective
) => {
  const { goalAchievedDescription, specificDeadline, thingTodoGoal } =
    body.visualProspective

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
  body: RequestBodyVisualProspective
) => {
  addData(visualProspective, body)

  const { timeReduceIdea } = body.visualProspective

  if (timeReduceIdea) {
    const foundSameIdea = visualProspective.timeReduceIdeas.some(
      t => t.idea === timeReduceIdea
    )

    if (foundSameIdea) {
      throw new CustomError('Time reduce idea already exists', Status.CONFLICT)
    }

    if (!foundSameIdea) {
      visualProspective.timeReduceIdeas.push({
        idea: timeReduceIdea
      } as ITimeReduceIdea)
    }
  }
}

export const updateDataOfVisualProspective = (
  visualProspective: IVisualProspective,
  body: RequestBodyVisualProspective
) => {
  addData(visualProspective, body)

  const { timeReduceIdea } = body.visualProspective

  if (timeReduceIdea) {
    const foundSameIdea = visualProspective.timeReduceIdeas.some(
      t => t.idea === timeReduceIdea
    )

    if (foundSameIdea) {
      throw new CustomError('Time reduce idea already exists', Status.CONFLICT)
    }

    if (!foundSameIdea) {
      visualProspective.timeReduceIdeas.push({
        idea: timeReduceIdea
      } as ITimeReduceIdea)
    }
  }
}
