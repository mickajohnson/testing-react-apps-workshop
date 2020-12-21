// testing custom hooks
// http://localhost:3000/counter-hook

import React from 'react'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

const UseCounterHookExample = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<UseCounterHookExample />)

  const increment = screen.getByRole('button', {name: 'Increment'})
  const decrement = screen.getByRole('button', {name: 'Decrement'})

  expect(screen.getByText('Current count: 0')).toBeInTheDocument()
  userEvent.click(increment)
  expect(screen.getByText('Current count: 1')).toBeInTheDocument()
  userEvent.click(decrement)
  expect(screen.getByText('Current count: 0')).toBeInTheDocument()
})

test('exposes the count and increment/decrement functions -2', () => {
  let result
  const TestComponent = () => {
    result = useCounter()
    return null
  }

  render(<TestComponent />)

  expect(result.count).toBe(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toBe(1)
  act(() => {
    result.decrement()
  })

  expect(result.count).toBe(0)
})

test('exposes the count and increment/decrement functions - 3', () => {
  let result
  const TestComponent = () => {
    result = useCounter()
    return null
  }

  render(<TestComponent />)

  expect(result.count).toBe(0)
  act(() => {
    result.increment()
  })
  expect(result.count).toBe(1)
  act(() => {
    result.decrement()
  })

  expect(result.count).toBe(0)
})

test('allows customization of initial count', () => {
  let result
  const TestComponent = () => {
    result = useCounter({initialCount: 1})
    return null
  }

  render(<TestComponent />)

  expect(result.count).toBe(1)
})

/* eslint no-unused-vars:0 */
