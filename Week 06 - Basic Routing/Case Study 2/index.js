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
    res.send('Hello')
})

app.get('/logo', (req, res) => {
    res.sendFile(__dirname + '/public/assets/logo.png')
})

app.get('/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params
    res.send(`Ini adalah routing GET /mahasiswa/${nim} dengan NIM ${nim}`)
})

app.post('/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params
    res.send(`Ini adalah routing POST /mahasiswa untuk membuat mahasiswa baru dengan NIM ${nim}`)
})

app.put('/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params
    res.send(`Ini adalah routing PUT /mahasiswa/${nim} untuk mengedit data mahasiswa dengan NIM ${nim}`)
})

app.delete('/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params
    res.send(`Ini adalah routing DELETE /mahasiswa/${nim} untuk menghapus data mahasiswa dengan NIM ${nim}`)
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})