import express from 'express'
import mysql2 from 'mysql2'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const host = '127.0.0.1'
const port = 3000

const db = mysql2.createConnection({
    host: '127.0.0.1',
    port: '3308',
    user: 'root',
    password: '',
    database: 'crud_db'
})

db.connect((err) => {
    if(err) {
        console.log('Database is disconnected!')
        console.log(err)
    } else {
        console.log('Database is connected!')
    }
})

// Parse application/json
app.use(bodyParser.json())

app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM product;"
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "status": 200,
            "error": null,
            "response": result
        })
    })
})

app.get('/api/product/:id', (req, res) => {
    const { id } = req.params
    let sql = `SELECT * FROM product WHERE product_id = ${id};`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "status": 200,
            "error": null,
            "response": result
        })
    })
})

app.post('/api/products', (req, res) => {
    const { product_name, product_price } = req.body
    let data = { product_name, product_price }
    let sql = "INSERT INTO product SET ?;"
    db.query(sql, data, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "status": 200,
            "error": null,
            "response": "Insert data success"
        })
    })
})

app.put('/api/product/:id', (req, res) => {
    const { id } = req.params
    const { product_name, product_price } = req.body
    let sql = `UPDATE product SET product_name = '${product_name}', product_price = ${product_price} WHERE product_id = ${id};`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "status": 200,
            "error": null,
            "response": "Update data success"
        })
    })
})

app.delete('/api/product/:id', (req, res) => {
    const { id } = req.params
    let sql = `DELETE FROM product WHERE product_id = ${id};`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "status": 200,
            "error": null,
            "response": "Delete data success"
        })
    })
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})