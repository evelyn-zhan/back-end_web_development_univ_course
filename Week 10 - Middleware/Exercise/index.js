import express from 'express'
import mysql2 from 'mysql2'
import bodyParser from 'body-parser'

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

const messageMiddleware = (req, res, next) => {
    console.log(`Request URL: ${req.url}`)
    console.log(`Request Type: ${req.method}\n`)
    next()
}

const errorMiddleware = (err, req, res, next) => {
    console.log(err)
    res.status(500).send('Something broke!')
    next()
}

const requestCheckMiddleware = (req, res, next) => {
    const { product_name, product_price } = req.body
    
    if(!product_name) {
        return res.status(400).json({
            "error": "product_name wajib diisi"
        })
    }

    if(product_price != 0 && !product_price) {
        return res.status(400).json({
            "error": "product_price wajib diisi"
        })
    }

    if(typeof(product_price) !== 'number') {
        return res.status(400).json({
            "error": "product_price wajib diisi dengan angka"
        })
    }

    if(product_price <= 0) {
        return res.status(400).json({
            "error": "product_price tidak boleh <= 0"
        })
    }

    next()
}

app.use(bodyParser.json())
app.use(messageMiddleware)
app.use(errorMiddleware)

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

app.post('/api/products', requestCheckMiddleware, (req, res) => {
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

app.put('/api/product/:id', requestCheckMiddleware, (req, res) => {
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

app.delete('/api/products/:id', requestCheckMiddleware, (req, res) => {
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
    console.log(`Server running at http://${host}:${port}\n`)
})