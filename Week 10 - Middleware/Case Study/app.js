import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import { list_username } from './user.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const host = '127.0.0.1'
const port = 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/:username', (req, res) => {
    const { username } = req.params
    const date = new Date(Date.now()).toLocaleDateString()
    const time = new Date(Date.now()).toLocaleTimeString()

    if (list_username.includes(username)) {
        console.log(`Params: ${username} ${date}, ${time}`)
        res.sendFile(__dirname + '/public/user.html')
    } else {
        res.sendFile(__dirname + '/public/unknown.html')
    }
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})