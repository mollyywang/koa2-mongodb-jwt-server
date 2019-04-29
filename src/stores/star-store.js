import Star from '../models/star.js';
import Mongoose from 'mongoose'
const ObjectId = Mongoose.Types.ObjectId

/**
 * handle database 操作数据库
 */

export default function createStarStore(logger) {
  return {
    async findStars(userId) {
      const data = await Star.aggregate([{
        '$match': {
          userId: ObjectId(userId)
        }
      },
      {
        '$lookup': {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'list'
        }
      }])
      return {
        data: data,
        len: data.length
      }
    },

    async addStar(userId, productId) {
      const star = new Star({
        userId: userId,
        productId: productId
      })
      const result = await star.save()
      logger.debug(`Created new star`, result)
      return result._id
    },

    async removeStar(userId, productId) {
      const result = await Star.find({
        userId: ObjectId(userId),
        productId: ObjectId(productId)
      }).remove()
      logger.debug(`Remove star`, result)
      return result.deletedCount
    }
  }
}