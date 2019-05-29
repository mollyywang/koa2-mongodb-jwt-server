import { apiHelper } from './api-helper'

describe('stars API', () => {
  it('can get starlist', async () => {
    const api = await apiHelper()
    const user = await api.login({
      username:'wangwang',
      password:'2222'
    })
    const config = {
      "headers":{"Authorization" : `Bearer ${user.data.token}`}
    }
    const response = await api.findStars({},config)
    expect(response.code).toEqual(0)
    expect(response.data.starsData).toBe(Array)
  })

  it('', async () => {
    const api = await apiHelper()
    const user = await api.login({
      username:'wangwang',
      password:'2222'
    })
    const config = {
      "headers":{"Authorization" : `Bearer ${user.data.token}`}
    }
    const product = await api.createProduct({
      "name": "Baby Wipes Testing add star",
      "price": 89.50,
      "image": "https://shop.coles.com.au/wcsstore/Coles-CAS/images/6/0/4/6044712-th.jpg",
      "urllink": "https://shop.coles.com.au/a/a-national/product/huggies--baby-wipes-unscented-tub",
      "from": "coles"
    })

    const response = await api.addStar({
        "productId": product.data
    },config)
    
    expect(response.data).toBe(String)
    expect(response.code).toEqual(0)
  })


})
