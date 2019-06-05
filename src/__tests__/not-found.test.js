import { apiHelper } from './api-helper'
import { throws } from 'smid'

describe('nonexisting routes', () => {
  it('returns 404 with the path and method info', async () => {
    const api = await apiHelper()
    const { response } = await throws(api.client.get('/public/nonexisting'))
    expect(response.status).toBe(404)
    expect(response.data).toMatch(/Not Found/)
  })
})
