import { describe, test, expect } from 'vitest'
import request from 'supertest'
import app from '../../app.ts'

describe('Test Get /launches', () => {
  test('Response should be 200', () => {
    const response = request(app.server)
    expect(response).to.equal(200)
  })
})
describe('Test POST /launches', () => {
  test('Response should be 200', () => {
    const response = 88800
    expect(response).to.equal(200)
  })
})
