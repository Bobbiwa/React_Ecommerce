/*
觉得测的意义不大，感觉只是测试了axios
*/
import axios from 'axios'
import { reqLogin, reqCategoryList, reqProductList, reqSearchProduct, reqProductDetail, reqUserList } from '../index'

jest.mock('axios')

describe('test request in success', () => {
    it('testing login request', async () => {
        axios.post.mockResolvedValueOnce({
            "id": 15,
            "username": "kminchelle",
            "token": "eyxxx"
        })
        const res = await reqLogin({ username: 'kminchelle', password: '0lelplR' })
        expect(res).toEqual({
            "id": 15,
            "username": "kminchelle",
            "token": "eyxxx"
        })

    })
    it('testing category list request', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                "smartphones",
                "laptops",
                "fragrances",
                "womens-dresses",
                "womens-shoes",
            ]
        })
        const res = await reqCategoryList()
        expect(res.data).toEqual([
            "smartphones",
            "laptops",
            "fragrances",
            "womens-dresses",
            "womens-shoes",
        ])
    })
    it('testing product list request', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                products: [
                    {
                        "id": 1,
                        "title": "iPhone 9",
                        "description": "An apple mobile which is nothing like apple",
                        "price": 549,
                    }
                ]
            }
        })
        const res = await reqProductList()
        expect(res.data.products).toEqual([
            {
                "id": 1,
                "title": "iPhone 9",
                "description": "An apple mobile which is nothing like apple",
                "price": 549,
            }
        ])
    })
    it('testing product list by search', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                products: [
                    {
                        "id": 1,
                        "title": "iPhone 9",
                        "description": "An apple mobile which is nothing like apple",
                        "price": 549,
                    }
                ]
            }
        })
        const res = await reqSearchProduct({ q: 'phone' })
        expect(res.data.products).toEqual([
            {
                "id": 1,
                "title": "iPhone 9",
                "description": "An apple mobile which is nothing like apple",
                "price": 549,
            }
        ])
    })
    it('testing product detail request', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                "id": 1,
                "title": "iPhone 9",
                "description": "An apple mobile which is nothing like apple",
                "price": 549
            }
        })
        const res = await reqProductDetail(1)
        expect(res.data).toEqual({
            "id": 1,
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549
        })
    })
    it('testing user list request', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                users: [
                    {
                        "id": 1,
                        "firstName": "Terry",
                        "lastName": "Medhurst",
                        "maidenName": "Smitham",
                        "age": 50,
                        "gender": "male"
                    }
                ]
            }
        })
        const res = await reqUserList()
        expect(res.data.users).toEqual([
            {
                "id": 1,
                "firstName": "Terry",
                "lastName": "Medhurst",
                "maidenName": "Smitham",
                "age": 50,
                "gender": "male"
            }
        ])
    })
})

describe('test request in error', () => {
    it('reject login', () => {
        axios.post.mockResolvedValueOnce(Promise.reject('Error 400'))
        return reqLogin().catch((err) => { expect(err.toString().indexOf('400') !== -1).toBeTruthy() })
        // expect(reqLogin()).rejects.toThrow(/400/)  此方式没有成功：received没有throw 
    })
    it('reject get category list',()=>{
        axios.get.mockResolvedValueOnce(Promise.reject('Error 400'))
        return reqCategoryList().catch((err) => { expect(err.toString().indexOf('400') !== -1).toBeTruthy() })
    })
    it('reject get product list',()=>{
        axios.get.mockResolvedValueOnce(Promise.reject('Error 400'))
        return reqProductList().catch((err) => { expect(err.toString().indexOf('400') !== -1).toBeTruthy() })
    })
    it('reject search product',()=>{
        axios.get.mockResolvedValueOnce(Promise.reject('Error 400'))
        return reqSearchProduct().catch((err) => { expect(err.toString().indexOf('400') !== -1).toBeTruthy() })
    })
    it('reject product detail',()=>{
        axios.get.mockResolvedValueOnce(Promise.reject('Error 400'))
        return reqProductDetail().catch((err) => { expect(err.toString().indexOf('400') !== -1).toBeTruthy() })
    })
    it('reject user list',()=>{
        axios.get.mockResolvedValueOnce(Promise.reject('Error 400'))
        return reqUserList().catch((err) => { expect(err.toString().indexOf('400') !== -1).toBeTruthy() })
    })
})



