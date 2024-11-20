import express from 'express'
import mysql2 from 'mysql2'
// import bodyParser from 'body-parser'
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
    database: 'comment_db'
})

db.connect((err) => {
    if(err) {
        console.log('Database is disconnected!')
        console.log(err)
    } else {
        console.log('Database is connected!')
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/comments', (req, res) => {
    let sql = "SELECT * FROM comments ORDER BY comment_created DESC LIMIT 5;"
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json(result)
    })
})

app.get('/api/comments/:id', (req, res) => {
    const { id } = req.params
    let sql = `SELECT * FROM comments WHERE comment_id = ${id};`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json(result)
    })
})

app.get('/api/comments/customer/:id', (req, res) => {
    const { id } = req.params
    let sql = `SELECT * FROM comments WHERE cust_id = ${id} ORDER BY comment_created DESC;`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json(result)
    })
})

app.post('/api/comment', (req, res) => {
    const { cust_id, product_id, comment_text } = req.body
    let data = { cust_id, product_id, comment_text, comment_created: new Date() }
    let sql = "INSERT INTO comments SET ?;"
    db.query(sql, data, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "status": "SUCCESS"
        })
    })
})

app.delete('/api/comment/:id', (req, res) => {
    const { id } = req.params
    let sql = `DELETE FROM comments WHERE comment_id = ${id};`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "status": "DELETED"
        })
    })
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})