const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3001

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

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end('Hello')
    } else if(req.url === '/data') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
    } else if(req.url === '/range-suhu-setahun') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
            "tgl_min": minTime,
            "min": minTemp,
            "tgl_max": maxTime,
            "max": maxTemp
        }))
    } else if(req.url.startsWith('/suhu-melebihi/')) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        const temperature = parseInt(req.url.split('/').pop())

        if(!temperature || !Number(temperature)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'text/plain')
            res.end('400 Bad Request')
        }

        const temperatureArr = temperatureMoreThan(temperature)

        res.end(JSON.stringify({
            "total": temperatureArr.length,
            "tgl": temperatureArr
        }))
    } else if(req.url.startsWith('/suhu-dibawah/')) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        const temperature = parseInt(req.url.split('/').pop())

        if(!temperature || !Number(temperature)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'text/plain')
            res.end('400 Bad Request')
        }

        const temperatureArr = temperatureLessThan(temperature)

        res.end(JSON.stringify({
            "total": temperatureArr.length,
            "tgl": temperatureArr
        }))
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('404 Not Found')
    }
})

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})