import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const hostname = '127.0.0.1'
const port = 3001

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/archive.json'))
})

app.get('/suhu-melebihi/:temperature', (req, res) => {
    const { temperature } = req.params

    if(!temperature || !Number(temperature)) {
        res.status(400).send('400 Bad Request')
    }

    const temperatureArr = temperatureMoreThan(parseInt(temperature))
    res.status(200).json({
        "total": temperatureArr.length,
        "tgl": temperatureArr
    })
})

app.get('/suhu-dibawah/:temperature', (req, res) => {
    const { temperature } = req.params

    if(!temperature || !Number(temperature)) {
        res.status(400).send('400 Bad Request')
    }

    const temperatureArr = temperatureLessThan(parseInt(temperature))
    res.status(200).json({
        "total": temperatureArr.length,
        "tgl": temperatureArr
    })
})

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

const data = JSON.parse(fs.readFileSync('../public/archive.json', 'utf-8'))

let minTemp = Infinity
let minTime = ''
let maxTemp = -Infinity
let maxTime = ''

for(let i = 0; i < data.daily.temperature_2m_min.length; i++) {
    if(data.daily.temperature_2m_min[i] < minTemp) {
        minTemp = data.daily.temperature_2m_min[i]
        minTime = data.daily.time[i]
    }
}

for(let i = 0; i < data.daily.temperature_2m_max.length; i++) {
    if(data.daily.temperature_2m_max[i] > maxTemp) {
        maxTemp = data.daily.temperature_2m_max[i]
        maxTime = data.daily.time[i]
    }
}

function temperatureMoreThan(temperature) {
    let temperatureArr = []

    for(let i = 0; i < data.daily.temperature_2m_max.length; i++) {
        if(data.daily.temperature_2m_max[i] > temperature) {
            temperatureArr.push({
                "suhu": data.daily.temperature_2m_max[i],
                "tgl": data.daily.time[i]
            })
        }
    }

    return temperatureArr
}

function temperatureLessThan(temperature) {
    let temperatureArr = []

    for(let i = 0; i < data.daily.temperature_2m_min.length; i++) {
        if(data.daily.temperature_2m_min[i] < temperature) {
            temperatureArr.push({
                "suhu": data.daily.temperature_2m_min[i],
                "tgl": data.daily.time[i]
            })
        }
    }

    return temperatureArr
}