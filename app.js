// Prvo uvozimo http in fs modula.
const http = require('http')
//uvozimo funkcijo iz routes.js
const routes = require('./routes')


//Zaženemo server, req in res sta imena spremenljivk, s katerimi 
//"komuniciramo" z node.js
const server = http.createServer(routes)

server.listen(3000)
//Zelo pomembna vrstica, ki prepreči takojšnjo zaključitev programa.
//Določi port na katerem se server odvija. Lahko izberemo več ali
//manj katerikoli port, dobra izbira so "tisočice"