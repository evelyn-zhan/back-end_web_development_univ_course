const http = require('http')
const fs = require('fs')
const port = 8000

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        const data = fs.readFileSync('index.html', 'utf-8')
        res.end(data)
    } else if (req.url === '/index.js') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/javascript')
        const script = fs.readFileSync('index.js', 'utf-8')
        res.end(script)
    } else {
        res.statusCode = 404
        res.end('404 Not Found')
    }
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})