import { apiHelper } from './api-helper'

describe('users API', () => {
  it('can register user', async () => {
    const api = await apiHelper()
    const user = await api.register({
        username:'wangwang',
        password:'2222'
    })
    expect(user.data).toBeDefined()
  })

  it('can get login', async () => {
    const api = await apiHelper()
    const response = await api.login({
        username:'wangwang',
        password:'2222'
    })
    expect(response.data.token).toBeDefined()
  })


})
