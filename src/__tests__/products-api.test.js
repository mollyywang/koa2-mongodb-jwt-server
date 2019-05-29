import { apiHelper } from './api-helper'

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
    expect(product.data).toBeDefined()
  })

  it('can get product', async () => {
    const api = await apiHelper()
    const newProduct = await api.createProduct({
      "name": "Baby Wipes Testing 2",
      "price": 89.50,
      "image": "https://shop.coles.com.au/wcsstore/Coles-CAS/images/6/0/4/6044712-th.jpg",
      "urllink": "https://shop.coles.com.au/a/a-national/product/huggies--baby-wipes-unscented-tub",
      "from": "coles"
    })
    const product = await api.getTodo(newProduct.data)
    expect(product.code).toEqual(0)
    expect(product.data[0]._id).toEqual(newProduct.data)
  })

  it('can get list', async () => {
    const api = await apiHelper()
    const response = await api.getList({
      "name": "eee",
      "index": 0,
      "counts": 16
    })
    expect(response.code).toEqual(0)
    expect(response.data.productData).toBe(Array)
  })


})
