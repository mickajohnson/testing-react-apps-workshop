// simple test with ReactDOM
// http://localhost:3000/counter

import React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

// good for cleanup to not rely on tests passing - afterEach would be fine too
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')

  document.body.append(div)
  //

  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div)
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')

  const [decrement, increment] = div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const message = div.firstChild.querySelector('div')
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0')
  // 🐨 click the increment button (💰 increment.click())
  increment.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
    }),
  )
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1')

  decrement.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
    }),
  )
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0')

  //
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // div.remove()
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
