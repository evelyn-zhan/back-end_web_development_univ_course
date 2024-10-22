import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const host = '127.0.0.1'
const port = 8000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/logo', (req, res) => {
    res.sendFile(__dirname + '/public/assets/logo.png')
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})