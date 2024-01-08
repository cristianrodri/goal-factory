import { render, screen } from '@testing-library/react'
import { Title } from './Title'

it('should render IndexPage', () => {
  render(<Title />)

  expect(screen.getByText(/title/i)).toBeInTheDocument()
})
