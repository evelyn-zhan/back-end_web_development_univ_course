import express from 'express'
import mysql2 from 'mysql2'

const app = express()
const host = '127.0.0.1'
const port = 3000

const conn = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Kidzilla01',
    database: 'mahasiswa_db'
})

conn.connect((err) => {
    if(err) {
        console.log('Database is disconnected!')
        console.log(err)
    } else {
        console.log('Database is connected!')
    }
})

app.get('/api/mahasiswa', (req, res) => {
    let sql = "SELECT * FROM mahasiswa;"
    let query = conn.query(sql, (err, result) => {
        res.json(result)
    })
})

app.get('/api/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params
    let sql = `SELECT * FROM mahasiswa WHERE nim_id = ${nim};`
    let query = conn.query(sql, (err, result) => {
        res.json(result)
    })
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})