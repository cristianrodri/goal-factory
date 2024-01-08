import { render, screen } from '@testing-library/react'
import IndexPage from './page'

it('should render IndexPage', () => {
  render(<IndexPage />)

  expect(screen.getByRole('main')).toBeInTheDocument()
})
