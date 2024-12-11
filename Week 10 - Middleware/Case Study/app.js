import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const host = '127.0.0.1'
const port = 3000

const list_username = ['bunny', 'lola']

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const myLog = (req, res, next) => {
    const { username } = req.params
    const date = new Date().toLocaleString()
    console.log(`Params: ${username} ${date}`)
    next()
}

app.get('/:username', myLog,
    (req, res, next) => {
        if(!list_username.includes(req.params.username.toLowerCase())) {
            next('route')
        } else {
            next()
        }
    }, (req, res, next) => {
        res.sendFile(__dirname + '/public/user.html')
    }
)

app.get('/:username', (req, res, next) => {
    res.sendFile(__dirname + '/public/unknown.html')
})

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`)
})