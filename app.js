const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html><body><p>Some text</p>')
        res.write('<form action="/message" method="POST"><input type="text" name="message">Besedilo.</input><button type="submit">Poslji</button></form></body></html>')
        return res.end
    }

    if (url === '/message' && method=== 'POST') {
        fs.writeFileSync('message.txt', 'Random besedilo.')
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.write('Sporocilo poslano!')
        return res.end
    }
})

server.listen(3000)