import { IMotivationBook } from '@/types'

export const checkPreviousMotivationBooks = (
  motivationBooks: IMotivationBook[]
) => {
  // Check if the sum of stabilities and the sum of motivation divided by the number of activities is greater than 7
  const sumStabilities = motivationBooks.reduce(
    (acc, motivationBook) =>
      acc +
      motivationBook.activities.reduce(
        (acc, activity) => acc + activity.stability,
        0
      ),
    0
  )

  const sumMotivations = motivationBooks.reduce(
    (acc, motivationBook) =>
      acc +
      motivationBook.activities.reduce(
        (acc, activity) => acc + activity.motivation,
        0
      ),
    0
  )

  return (
    sumStabilities / motivationBooks.length > 7 &&
    sumMotivations / motivationBooks.length > 7
  )
}
