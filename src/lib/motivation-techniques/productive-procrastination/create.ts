import ProductiveProcrastination from './model'

export const createUserProductiveProcrastination = async (user: string) => {
  const userProductiveProcrastination = await ProductiveProcrastination.create({
    user,
    productiveList: []
  })

  return userProductiveProcrastination
}
