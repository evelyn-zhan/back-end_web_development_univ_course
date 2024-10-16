const http = require('http')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')

    // const data = fs.readFileSync('index.html')
    // res.end(data)

    if (req.url === '/' || req.url === '/index.html') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        const data = fs.readFileSync('index.html', 'utf-8')
        res.end(data)
    } else if (req.url === '/script.js') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/javascript')
        const script = fs.readFileSync('script.js', 'utf-8')
        res.end(script)
    } else {
        res.statusCode = 404
        res.end('404 Not Found')
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})