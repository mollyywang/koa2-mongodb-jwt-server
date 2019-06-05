import { createServer } from '../lib/server'
import { memoize } from 'lodash'
import axios from 'axios'

/**
 * API helper to make it easier to test endpoints.
 */

export async function apiHelper() {
    const server = await startServer()
    const baseURL = `http://127.0.0.1:${server.address().port}`
    const client = axios.create({
        baseURL
    })

    return {
        catch: catchAndLog, // Useful for logging failing requests
        client,
        login: data => client.post(`/public/user/login`, data).then(assertStatus(200)),
        register: data => client.post(`/public/user/register`, data).then(assertStatus(200)),
        getProduct: id =>
            client.get(`/public/products/get/${id}`).then(assertStatus(200)),
        getList: data => client.post(`/public/products/getlist`, data).then(assertStatus(200)),
        createProduct: data => client.post('/public/products/create', data).then(assertStatus(200)),
        findStars: (headers) => {
            return client.get(`/star/starlist`, headers).then(assertStatus(200))
        },
        addStar: (data, config) => {
            return client.post(`/star/add`, data, config).then(assertStatus(200))
        },
        removeStar: (headers) => {
            return client.get(`/star/remove`, headers).then(assertStatus(200))
        },
    }
}

/**
 * Creates a status asserter that asserts the given status on the response,
 * then returns the response data.
 *
 * @param {number} status
 */
export function assertStatus(status) {
    return async function statusAsserter(response) {
        if (response.status !== status) {
            throw new Error(
                `Expected ${status} but got ${response.status}: ${response.request.method} ${
                response.request.path
                }`
            )
        }
        return response.data
    }
}

function catchAndLog(err) {
    if (err.response) {
        console.error(
            `Error ${err.response.status} in request ${err.response.request.method} ${
            err.response.request.path
            }`,
            err.response.data
        )
    }
    throw err
}

const startServer = memoize(async () => {
    return (await createServer()).listen()
})

afterAll(async () => {
    // Server is memoized so it won't start a new one.
    // We need to close it.
    const server = await startServer()
    return new Promise(resolve => server.close(resolve))
})
