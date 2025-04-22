import { describe, test, expect } from 'vitest'
import app from '../../app.ts'

describe('Test Get /launches', () => {
  test('Response should be 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/launches',
    })
    expect(response.statusCode).to.equal(200)
    expect(response.headers['content-type']).to.equal(
      'application/json; charset=utf-8'
    )
  })
})
describe('Test POST /launches', () => {
  const completeLaunchData = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    destination: 'Kepler-62 f',
    launchDate: 'January 4, 2028',
  }

  const bodyWithoutDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    destination: 'Kepler-62 f',
  }

  test('Response should be 201 created', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/launches',
      body: completeLaunchData,
    })

    expect(response.statusCode).to.equal(201)
    expect(response.headers['content-type']).to.equal(
      'application/json; charset=utf-8'
    )
  })

  test('Response should be 400', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/launches',
      body: bodyWithoutDate,
    })
    expect(response.statusCode).to.equal(400)
  })
})
