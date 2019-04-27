import { NotFound, BadRequest } from 'fejl'
import { pick } from 'lodash'

// Prefab assert function.
const assertId = BadRequest.makeAssert('No id given')

// Prevent overposting.
const pickProps = data => pick(data, ['title', 'completed'])

/**
 * Star Service.
 * Gets a Star store injected.
 */
export default class StarService {
  constructor(starStore,productStore,logger) {
    this.starStore = starStore
    this.productStore = productStore
    this.logger = logger
  }

  async findStars(userId) {
    const res = {
      data: null,////??
      code: 0
    }
    res.data = await this.starStore.findStars(userId)
    return res
  }

  async addStar(userId,data) {
    const res = {
        data:{},
        code:0
    }
    BadRequest.assert(data.productId, 'name is required')
    res.data = await this.starStore.addStar(userId,data.productId)
    if(!res.data){
      res.code = 1
      return res
    }
    return res
  }

  async removeStar(userId,productId) {
    const res = {
        data:{},
        code:0
    }
    res.data = await this.starStore.removeStar(userId,productId)
    if(res.data == 0){
      res.code = 1
      return res
    }
    return res
  }

}
