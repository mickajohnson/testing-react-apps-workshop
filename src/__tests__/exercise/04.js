// form testing
// http://localhost:3000/login

import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  let submittedData = null
  const handleSubmit = data => (submittedData = data)
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  const usernameField = screen.getByRole('textbox', {name: /username/i})
  const passswordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, 'Mick')
  userEvent.type(passswordField, 'Password')
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(submittedData).toEqual({
    username: 'Mick',
    password: 'Password',
  })

  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

test('submitting the form calls onSubmit with username and password EX 1', () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passswordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, 'Mick')
  userEvent.type(passswordField, 'Password')
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'Mick',
    password: 'Password',
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('submitting the form calls onSubmit with username and password EX 2', () => {
  const getLoginForm = () => ({
    username: faker.internet.userName(),
    password: faker.internet.password(),
  })

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passswordField = screen.getByLabelText(/password/i)

  const {username, password} = getLoginForm()

  userEvent.type(usernameField, username)
  userEvent.type(passswordField, password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

test('submitting the form calls onSubmit with username and password EX 3', () => {
  const getLoginForm = (overrides = {}) => ({
    username: overrides.username || faker.internet.userName(),
    password: overrides.password || faker.internet.password(),
    ...overrides,
  })

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passswordField = screen.getByLabelText(/password/i)

  const specialPassword = '1234567'

  const {username, password} = getLoginForm({password: specialPassword})

  userEvent.type(usernameField, username)
  userEvent.type(passswordField, password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password: specialPassword,
  })
})

test('submitting the form calls onSubmit with username and password EX 4', () => {
  const userBuilder = build('User', {
    fields: {
      username: fake(f => f.internet.userName()),
      password: fake(f => f.internet.password()),
    },
  })

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passswordField = screen.getByLabelText(/password/i)

  const {username, password} = userBuilder()

  userEvent.type(usernameField, username)
  userEvent.type(passswordField, password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
