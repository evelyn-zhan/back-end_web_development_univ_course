import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const hostname = '127.0.0.1'
const port = 8000

app.use(express.static(path.join(__dirname, '../templatemo_559_zay_shop')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../templatemo_559_zay_shop/index.html'))
})

app.get('/page/about/', (req, res) => {
    res.sendFile(path.join(__dirname, '../templatemo_559_zay_shop/about.html'))
})

app.get('/page/contact/', (req, res) => {
    res.sendFile(path.join(__dirname, '../templatemo_559_zay_shop/contact.html'))
})

app.get('/page/shop/', (req, res) => {
    res.sendFile(path.join(__dirname, '../templatemo_559_zay_shop/shop.html'))
})

app.get('/page/shop/:shop', (req, res) => {
    res.sendFile(path.join(__dirname, '../templatemo_559_zay_shop/shop-single.html'))
})

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})