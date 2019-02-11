// Prvo uvozimo http in fs modula.
const http = require('http')
const fs = require('fs')

//Zaženemo server, req in res sta imena spremenljivk, s katerimi 
//"komuniciramo" z node.js
const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = []
        //node.js nam vrača podatke v obliki paketkov, da jih
        //lahko sproti obdelujemo. Mi jih moramo nato sestaviti,
        //in predelati v text (so v UNICODE?? oz nekaj podobnega).
        req.on('data',(chunk) => { 
            body.push(chunk)
            console.log(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)
            fs.writeFileSync('message.txt', parsedBody.split('=')[1])
        })
        res.statusCode = 302
        //statusCode 302 pove, da bomo spremenili http naslov
        res.setHeader('Location', '/')
        res.write('Sporocilo poslano!')
        return res.end
    }
})

server.listen(3000)
//Zelo pomembna vrstica, ki prepreči takojšnjo zaključitev programa.
//Določi port na katerem se server odvija. Lahko izberemo več ali
//manj katerikoli port, dobra izbira so "tisočice"