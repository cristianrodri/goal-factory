import Dependency from './model'

export const createUserDependecy = async (user: string) => {
  const dependencyCreated = await Dependency.create({
    dependencies: [],
    user
  })

  return dependencyCreated
}
