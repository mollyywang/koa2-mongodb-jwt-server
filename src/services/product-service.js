import { NotFound, BadRequest } from 'fejl'
import { pick } from 'lodash'
import xss from 'xss'

// use xss() to prevent Cross Site Script 预防跨域攻击
const pickProps = (data) => {
  data.name = xss(data.name)
  data.price = xss(data.price)
  data.image = xss(data.image)
  data.from = xss(data.from)
  data.urllink = xss(data.urllink)
  return pick(data, ['name', 'price', 'image', 'from', 'urllink'])
}

/**
 * Product Service.
 * Gets a product store injected.
 */

export default class ProductService {
  constructor(productStore, logger) {
    this.productStore = productStore
    this.logger = logger
  }

  async getList(body) {
    // this.logger.debug(body);
    const res = {
      data: {},
      code: 0
    }
    res.data = await this.productStore.getList(body.name, body.index, body.counts)
    if (!res.data) {
      res.code = 1
      return res
    }
    return res
  }

  async get(id) {
    BadRequest.assert(id, 'No id given')
    const res = {
      data: null,
      code: 0
    }
    res.data = await this.productStore.get(id)
    if (!res.data) {
      res.code = 1
      return res
    }
    return res
  }

  async create(data) {
    const res = {
      data: {},
      success: true
    }
    BadRequest.assert(data, 'No product payload given')
    BadRequest.assert(data.name, 'name is required')
    BadRequest.assert(data.price, 'price is required')
    BadRequest.assert(data.image, 'image is required')
    BadRequest.assert(data.from, 'from is required')
    BadRequest.assert(data.urllink, 'urllink is required')
    res.data = await this.productStore.create(pickProps(data))
    if (!res.data) {
      res.code = 1
      return res
    }
    return res
  }
}
