import { apiHelper } from './api-helper'
import { throws } from 'smid'

describe('products API', () => {
  it('can create product', async () => {
    const api = await apiHelper()
    const product = await api.createProduct({
      "name": "Baby Wipes Testing",
      "price": 6.50,
      "image": "https://shop.coles.com.au/wcsstore/Coles-CAS/images/6/0/4/6044712-th.jpg",
      "urllink": "https://shop.coles.com.au/a/a-national/product/huggies--baby-wipes-unscented-tub",
      "from": "coles"
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
