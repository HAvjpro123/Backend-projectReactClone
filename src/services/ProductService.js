const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, typeRoom, type, price, countInStock, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'oke',
                    message: 'the name of product is already'
                })
            }
            const newProduct = await Product.create({
                name, image, typeRoom, type, price, countInStock, rating, description
            })
            if (newProduct) {
                resolve({
                    status: 'ok',
                    message: 'Success',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkProduct = await Product.findOne({
                _id: id

            })
            if (checkProduct === null) {
                resolve({
                    status: 'oke',
                    message: 'the product is not defined'
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            console.log("updateProduct", updateProduct)
            resolve({
                status: 'ok',
                message: 'Success',
                data: updateProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const product = await Product.findOne({
                _id: id
            })
            // console.log('checkUser', checkUser)
            if (product === null) {
                resolve({
                    status: 'oke',
                    message: 'the product is not defined'
                })
            }
            resolve({
                status: 'ok',
                message: 'get details user Success',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            // console.log('checkUser', checkUser)
            if (checkProduct === null) {
                resolve({
                    status: 'oke',
                    message: 'the product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'ok',
                message: 'DELETE PRODUCT ' + id + ' Success'
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            console.log("filter", filter)
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex' : filter[1]} }).limit(limit).skip(page * limit)
                resolve({
                    status: 'ok',
                    message: 'Get product Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'ok',
                    message: 'Get product Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })

            }
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: 'ok',
                message: 'Get all product Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })


        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}