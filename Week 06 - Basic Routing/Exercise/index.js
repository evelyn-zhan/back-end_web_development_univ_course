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
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html')
})

app.get('/special', (req, res) => {
    res.sendFile(__dirname + '/public/special.html')
})

app.get('/popular', (req, res) => {
    res.sendFile(__dirname + '/public/popular.html')
})

app.get('/product/:name', (req, res) => {
    const { name } = req.params
    res.send(`<h1 style="padding: 2rem; font-family: 'Manrope', sans-serif;">Product Name: ${name}</h1>`)
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})