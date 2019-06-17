const http = require('http')
const url = require('url')
let server = http.createServer((req,res)=>{
    var pathObj = url.parse(req.url, true)
    try {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
        res.writeHead(200, 'OK')
        res.write('djfajsdfsdfasd')
        
    } catch (error) {
        res.writeHead(404, 'not found')
    }
    res.end()
})
server.listen(6060)