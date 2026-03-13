const { addProduct, getProductById, getProducts, countProducts, updateProduct, deleteProduct } = require("../models/Product")
const helperWrapper = require('../helpers/wrapper')
const { v4: uuidv4 } = require('uuid')

module.exports = {
    // Create product
    createProduct: async (req, res) => {
        try {
            const { brand, category, stock, price, desc } = req.body

            if (!brand || !category || !stock || !price || !desc) {
                return helperWrapper.response(
                    res, 400, `All field must filled`, null
                )
            }
            // uuid is required by the database schema; generate on the server
            const data = {
                uuid: uuidv4(),
                brand,
                category,
                stock,
                price,
                desc,
            }
            const result = await addProduct(data)
            return helperWrapper.response(res, 201, "Success create new product", result)
        } catch (err) {
            return helperWrapper.response(
                res, 400, `Bad request (${err.message})`, null
            )
        }
    },

    // Get all products
    getAllProducts: async (req, res) => {
        try {
            // use let for variables that will be reassigned and provide sensible defaults
            let {
                keyword = '',
                orderBy = 'brand',
                sortBy = 'asc',
                page = 1,
                limit = 100
            } = req.query

            page = Number(page) || 1
            limit = Number(limit) || 100
            const offset = page * limit - limit

            let totalProduct = await countProducts()
            totalProduct = totalProduct[0].total

            const resultProduct = await getProducts(keyword, orderBy, sortBy, limit, offset)
            if (resultProduct.length === 0) {
                return helperWrapper.response(
                    res, 404, `Data Empty`, []
                )
            }
            const totalRow = resultProduct.length
            const totalPage = Math.ceil(totalRow / limit)

            const result = { resultProduct, totalRow, page, totalPage, totalProduct }
            return helperWrapper.response(res, 200, "Success get data", result)
        } catch (err) {
            return helperWrapper.response(
                res, 400, `Bad request ${err.message}`, null
            )
        }
    },
    // Get DetailProuct
    getProductById: async (req, res) => {
        try {
            const { uuid } = req.params
            const result = await getProductById(uuid)
            if (result.length === 0) {
                return helperWrapper.response(
                    res, 404, `Product by id ${uuid} not found!`, null
                )
            }
            return helperWrapper.response(
                res, 200, `Success get product by id ${uuid}`, result[0]
            )
        } catch (err) {
            return helperWrapper.response(
                res, 400, `Bad request (${err.message})`, null
            )
        }
    },
    // Update product
    updateProduct: async (req, res) => {
        try {
            const { uuid } = req.params
            const idCheck = await getProductById(uuid)
            if (!idCheck.length) {
                return helperWrapper.response(
                    res, 404, `Product by id ${uuid} not found!`, null
                )
            }
            const { brand, category, stock, price, desc } = req.body
            if (!brand && !category && !stock && !price && !desc) {
                return helperWrapper.response(res, 400, `nothing updated`, null)
            }
            const setData = {
                ...req.body, dt_updated: new Date(Date.now())
            }
            const result = await updateProduct(setData, uuid)
            // console.log(result)

            return helperWrapper.response(
                res, 200, `Success update product`, result
            )
        } catch (err) {
            return helperWrapper.response(
                res, 400, `Bad request (${err.message})`, null
            )
        }
    },
    // Delete product
    deleteProduct: async (req, res) => {
        try {
            const { uuid } = req.params
            console.log(uuid)
            const idCheck = await getProductById(uuid)
            if (!idCheck.length) {
                return helperWrapper.response(
                    res, 404, `Product by id ${uuid} not found!`, null
                )
            }
            const result = await deleteProduct(uuid)
            return helperWrapper.response(
                res, 200, `Success delete product`, result
            )
        } catch (err) {
            return helperWrapper.response(res, 400, `Bad request (${err.message})`, null)
        }
    }
}