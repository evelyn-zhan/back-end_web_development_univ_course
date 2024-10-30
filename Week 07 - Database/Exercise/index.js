import express from 'express'
import mysql2 from 'mysql2'

const app = express()
const conn = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Kidzilla01',
    database: 'store_db'
})
const host = '127.0.0.1'
const port = 3000

conn.connect((err) => {
    if(err) {
        console.log('Database is disconnected!')
        console.log(err)
    } else {
        console.log('Database is connected!')
    }
})

app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM product;"
    let query = conn.query(sql, (err, result) => {
        res.json({
            "status": 200,
            "error": null,
            "response": result
        })
    })
})

app.get('/api/products/:id', (req, res) => {
    let sql = `SELECT * FROM product WHERE product_id = ${req.params.id};`
    let query = conn.query(sql, (err, result) => {
        res.json({
            "status": 200,
            "error": null,
            "response": result
        })
    })
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})