import TaskSamurai from './model'

export const createUserTaskSamurai = async (user: string) => {
  const taskSamurai = await TaskSamurai.create({ user, boredTasks: [] })

  return taskSamurai
}
