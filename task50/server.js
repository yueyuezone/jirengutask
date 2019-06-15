const http = require('http')
http.createServer(function(req,res){
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Set-Cookie',['date=FASDFAFSD'])
    res.setHeader('Location','www.baidu.com')
    res.writeHead('301',)
    res.end('<h1>hjhjhj</h1>')
}).listen('8080')