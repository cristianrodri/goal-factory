import Dependency from './model'

export const createUserDependecy = async (
  user: string,
  dependency?: string
) => {
  const dependencyCreated = await Dependency.create({
    dependencies: dependency ? [{ dependency }] : [],
    user
  })

  return dependencyCreated
}
