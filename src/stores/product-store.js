import Product from '../models/product.js';

/**
 * handle database 操作数据库
 */

export default function createProductStore(logger) {
  return {
    async getList(name, index, counts) {
      const productData = await Product.find({}).skip(index).limit(counts)
      const allNums = await Product.find({}).count()
      return {
        "productData": productData,
        "allNums": allNums
      }
    },

    async get(id) {
      logger.debug(`Getting Product with id ${id}`)
      return await Product.find({ _id: id })
    },

    async create(data) {
      const product = new Product({
        ...data,
      })
      const result = await product.save()
      // logger.debug(`Created new product`, result)
      return result._id
    }
  }
}
