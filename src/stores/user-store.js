/**
 * In-memory products store.
 * For demo purposes, gets the logger injected.
 */
import mongoose from 'mongoose';
import User from '../models/user.js';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '../lib/env'
import { pick } from 'lodash'

export default function createUserStore(logger) {


  return {
    async register(username,password){
    const user = new User({
        username:username,
        password:password
      })
      const result = await user.save()
      logger.debug(`Created new user`, result)
      return {
        code:0,
        data:{
            username:result.username
            }
        }
    },

    async get(username){
      return await User.find({username:username})
    },

    async login(username) {
        const user = await this.get(username)
        const userdata = pick(user[0], ['meta', 'username','_id'])
        return {
            code: 0,
            data:{
                username:username,
                token: jsonwebtoken.sign({
                data: userdata,
                //exp in seconds
                exp: Math.floor(Date.now() / 1000) + (60 * 60) // 60 seconds * 60 minutes = 1 hour
                }, env.SECRET)
            }
        }
    },

    async logout(username) {
      
    }
  }
}
