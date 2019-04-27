import {
  // NotFound,
  BadRequest
} from 'fejl'
import {
  pick
} from 'lodash'
import xss from 'xss'
import bcrypt from 'bcrypt';


// Prevent overposting.
const pickProps = (data) => {
  data.username = xss(data.username)
  data.password = xss(data.password)
  return pick(data, ['username', 'password'])
}


export default class UserService {
  constructor(userStore, logger) {
    this.userStore = userStore
    this.logger = logger
  }

  async register(body) {
    BadRequest.assert(body.username, 'No username given')
    BadRequest.assert(body.password, 'No password given')
    const password = await bcrypt.hash(body.password, 5)
    const user = await this.userStore.get(body.username)
    if (user.length == 0) {
      return this.userStore.register(xss(body.username), password)
    } else {
      return {
        data: {
          message: "User exists"
        },
        code: 1
      }
    }

  }

  async login(body) {
    BadRequest.assert(body.username, 'No username given')
    BadRequest.assert(body.password, 'No password given')
    // const username = 
    const user = await this.userStore.get(body.username)
    if (user.length == 0) {
      return {
        data: {
          message: "Invalid Username Or Password"
        },
        code: 1
      }
    }
    if (!await bcrypt.compare(body.password, user[0].password)) {
      return {
        data: {
          message: "Invalid Username Or Password"
        },
        code: 1
      }
    }
    return await this.userStore.login(body.username)
  }

  async logout(body) {
    // BadRequest.assert(data, 'No product payload given')
    // BadRequest.assert(data.name, 'name is required')
    // BadRequest.assert(data.price, 'price is required')
    // BadRequest.assert(data.image, 'image is required')
    // BadRequest.assert(data.from, 'from is required')
    // BadRequest.assert(data.urllink, 'urllink is required')
    // return this.productStore.create(pickProps(data))
  }

}