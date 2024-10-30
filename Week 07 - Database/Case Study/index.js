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

app.get('/api/customers', (req, res) => {
    let sql = "SELECT * FROM customers;"
    let query = conn.query(sql, (err, result) => {
        res.json(result)
    })
})

app.get('/api/customers/:name', (req, res) => {
    const { name } = req.params
    let sql = `SELECT * FROM customers WHERE upper(cust_name) = upper('${name}');`
    let query = conn.query(sql, (err, result) => {
        res.json(result)
    })
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})