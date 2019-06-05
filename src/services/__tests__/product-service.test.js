import { throws } from 'smid'
import { logger } from '../../lib/logger'

import ProductService from '../product-service'

// This test only verify invariants, not interaction with dependencies.
// That is tested with integration tests.
describe('ProductService', () => {
    describe('getList', () => {
        it('can find products', async () => {
            const { service, products } = setup()
            expect((await service.getList({name: 'xx', index: 0, counts: 15})).data).toEqual(products)
        })
    })

    describe('get', () => {
        it('throws when not found', async () => {
            const { service, products } = setup()
            expect((await service.get('nonexistent')).code).toBe(1)
            expect((await service.get('1')).data).toEqual(products[0])
        })
    })

    describe('create', () => {
        it('throws when no payload is given', async () => {
            const { service } = setup()
            const err = await throws(service.create())
            expect(err.message).toMatch(/payload/)
        })

        it('throws when name is invalid', async () => {
            const { service } = setup()
            expect((await throws(service.create())).message).toMatch(/payload/)
            expect((await throws(service.create({}))).message).toMatch(/name/)
        })

        it('removes unknown props', async () => {
            const { service } = setup()
            const res = await service.create({
                name: 'Water Wipes Baby Wipes 60 pack',
                price: 7.80,
                image: 'https://cdn1.woolworths.media/content/wowproductimages/medium/746640.jpg',
                urllink: 'https://www.woolworths.com.au/shop/productdetails/746640/water-wipes-baby-wipes',
                from: 'ww'
            })
            expect(res.data.name).toEqual(
                'Water Wipes Baby Wipes 60 pack'
            )
        })
    })
})

function setup() {
    const products = [
        {
            name: 'Water Wipes Baby Wipes 60 pack',
            price: 7.80,
            image: 'https://cdn1.woolworths.media/content/wowproductimages/medium/746640.jpg',
            urllink: 'https://www.woolworths.com.au/shop/productdetails/746640/water-wipes-baby-wipes',
            from: 'ww',
            id: '1'
        },
        {
            name: 'Cleansing Facial Wipes',
            price: 1.99,
            image: 'https://www.kmart.com.au/wcsstore/Kmart/images/ncatalog/f/7/42538127-1-f.jpg',
            urllink: 'https://www.kmart.com.au/product/cleansing-facial-wipes/1936808',
            from: 'kmart',
            id: '2'
        }
    ]
    // Mock store
    const store = {
        getList: jest.fn(async () => [...products]),
        get: jest.fn(async id => products.find(x => x.id === id)),
        create: jest.fn(async data => ({ ...data })),
    }
    return { service: new ProductService(store, logger), store, products }
}

