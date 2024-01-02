import { render, screen } from '@testing-library/react'
import IndexPage from './page'

it('should render IndexPage', () => {
  render(<IndexPage />)

  screen.debug()

  expect(screen.getByRole('main')).toBeInTheDocument()
})
