// Avoid implementation details
// http://localhost:3000/counter
import userEvent from '@testing-library/user-event'

import React from 'react'
import {render, screen} from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)

  const increment = screen.getByRole('button', {name: 'Increment'})
  const decrement = screen.getByRole('button', {name: 'Decrement'})

  expect(screen.getByText('Current count: 0')).toBeInTheDocument()
  userEvent.click(increment)
  expect(screen.getByText('Current count: 1')).toBeInTheDocument()
  userEvent.click(decrement)
  expect(screen.getByText('Current count: 0')).toBeInTheDocument()
})
