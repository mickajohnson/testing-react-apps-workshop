// mocking Browser APIs and modules
// http://localhost:3000/location

import React from 'react'
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}
// 💰 Here's an example of how you use this:
// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// // assert on the resolved state

// beforeAll(() => {
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//   }
// })

// test('displays the users current location', async () => {
//   const latitude = 5675.55
//   const longitude = 2424.24

//   const fakePosition = {
//     coords: {
//       latitude,
//       longitude,
//     },
//   }

//   const {promise, resolve} = deferred()

//   window.navigator.geolocation.getCurrentPosition.mockImplementation(
//     successCallback => {
//       promise.then(() => {
//         // act(() => {
//         successCallback(fakePosition)
//         // })
//       })
//     },
//   )

//   render(<Location />)

//   expect(screen.getByLabelText('loading...'))

//   await act(async () => {
//     resolve()
//     await promise
//   })

//   expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()

//   expect(screen.getByText(`Latitude: ${latitude}`)).toBeInTheDocument()
//   expect(screen.getByText(`Longitude: ${longitude}`)).toBeInTheDocument()
// })
test('displays the users current location', async () => {
  const latitude = 5675.55
  const longitude = 2424.24

  const fakePosition = {
    coords: {
      latitude,
      longitude,
    },
  }

  let setMockPosition
  const useMockCurrentPosition = () => {
    const [position, setPosition] = React.useState()

    setMockPosition = setPosition
    return [position]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  expect(screen.getByLabelText('loading...'))

  act(() => {
    setMockPosition(fakePosition)
  })

  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()

  expect(screen.getByText(`Latitude: ${latitude}`)).toBeInTheDocument()
  expect(screen.getByText(`Longitude: ${longitude}`)).toBeInTheDocument()
})

// jest.mock('react-use-geolocation', () => {
//   const actualUseGeolo = jest.requireActual('react-use-geolocation')
//   return {
//     ...actualUseGeolocation,
//     subtract: jest.fn(),
//   }
// })

/*
eslint
  no-unused-vars: "off",
*/
