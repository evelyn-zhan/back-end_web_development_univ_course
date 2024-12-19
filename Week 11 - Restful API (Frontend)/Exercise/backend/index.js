import express from 'express'
import mysql2 from 'mysql2'
import cors from 'cors'

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

app.use(express.json())
app.use(cors())

app.get('/api/users', (req, res) => {
    let sql = "SELECT * FROM user;"
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).send(result)
    })
})

app.get('/api/user/:id', (req, res) => {
    const { id } = req.params
    let sql = `SELECT * FROM user WHERE user_id = ${id};`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).send(result[0])
    })
})

app.post('/api/users', (req, res) => {
    const { user_name, user_email, user_address, user_phone } = req.body
    let data = { user_name, user_email, user_address, user_phone }

    let sql = "INSERT INTO user SET ?;"

    db.query(sql, data, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "fieldCount": result.fieldCount,
            "affectedRows": result.affectedRows,
            "insertId": result.insertId,
            "info": result.info,
            "serverStatus": result.serverStatus,
            "warningStatus": result.warningStatus
        })
    })
})

app.put('/api/user/:id', (req, res) => {
    const { id } = req.params
    const { user_name, user_email, user_address, user_phone } = req.body

    let sql = `UPDATE user SET user_name = '${user_name}', user_email = '${user_email}', user_address = '${user_address}', user_phone = '${user_phone}' WHERE user_id = ${id};`

    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "fieldCount": result.fieldCount,
            "affectedRows": result.affectedRows,
            "insertId": result.insertId,
            "info": result.info,
            "serverStatus": result.serverStatus,
            "warningStatus": result.warningStatus,
            "changedRows": result.changedRows
        })
    })
})

app.delete('/api/user/:id', (req, res) => {
    const { id } = req.params
    let sql = `DELETE FROM user WHERE user_id = ${id};`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(200).json({
            "fieldCount": result.fieldCount,
            "affectedRows": result.affectedRows,
            "insertId": result.insertId,
            "info": result.info,
            "serverStatus": result.serverStatus,
            "warningStatus": result.warningStatus
        })
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`)
})