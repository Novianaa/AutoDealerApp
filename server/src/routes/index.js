const express = require("express")
const app = express()
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController")

// Product Routes
app.post("/product", createProduct)
app.get("/products", getAllProducts)
app.get("/product/:uuid", getProductById)
app.put("/product/:uuid", updateProduct)
app.delete("/product/:uuid", deleteProduct)

module.exports = app