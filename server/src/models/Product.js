const db = require("../../database")

module.exports = {
    // Create product
    addProduct: async (data) => {
        try {
            const [result] = await db.query('INSERT INTO products SET ?', data)
            return {
                uuid: result.insertId,
                ...data,
            }
        } catch (err) {
            throw new Error(err.sqlMessage || err.message)
        }
    },

    // Get all products
    getProducts: async (keyword, orderBy, sortBy, limit, offset) => {
        try {
            const [rows] = await db.query(
                `SELECT * FROM products WHERE brand LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortBy} LIMIT ? OFFSET ?`,
                [limit, offset]
            )
            return rows
        } catch (err) {
            throw new Error(err.message)
        }
    },

    // Get product by id
    getProductById: async (id) => {
        try {
            const [rows] = await db.query(`SELECT * FROM products WHERE uuid=?`, [id])
            return rows
        } catch (err) {
            throw new Error(err.sqlMessage || err.message)
        }
    },

    // Count products
    countProducts: async () => {
        try {
            const [rows] = await db.query(`SELECT COUNT(*) as total FROM products`)
            return rows
        } catch (err) {
            throw new Error(err.message)
        }
    },
    // Update product
    updateProduct: async (data, uuid) => {
        try {
            await db.query(`UPDATE products SET ? WHERE uuid = ?`, [data, uuid])
            return {
                uuid,
                ...data,
            }
        } catch (err) {
            throw new Error(err.sqlMessage || err.message)
        }
    },

    // Delete product
    deleteProduct: async (uuid) => {
        try {
            await db.query(`DELETE FROM products WHERE uuid=?`, [uuid])
            return `Delete product by uuid ${uuid}`
        } catch (err) {
            throw new Error(err.sqlMessage || err.message)
        }
    }
}
