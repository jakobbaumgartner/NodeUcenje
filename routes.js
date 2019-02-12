const fs = require('fs')

function requestHandler(req, res) {
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

        //pomembno je, da node.js izvede te req asinhronsko (callback), 
        //torej bo čakal na prožilni dogodek in bo prvo sprožil
        //recimo res.statusCode = 302, ker ne potrebuje čakati v 
        //dani situaciji

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
}

module.exports = requestHandler

// v javascript sta dva načina za exportanje kode 
// v drugo datoteko prvi je z dodajanjem na dnu datoteke module.exports = {kar želimo exportati}
// nato v željeni datoteki requiramo noramalno prejšnjo datoteko, vendar lokalno z ./routes recimo
