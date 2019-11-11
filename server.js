const http = require('http')
const uid = require('uid')

let cards = require('./cards.json')
cards.forEach(card => (card.id = uid()))

const server = http.createServer((req, res) => {
  if (req.method === 'DELETE') {
    const id = req.url.replace('/cards/', '')
    const index = cards.findIndex(card => card.id === id)
    const cardToDelete = cards[index]
    cards.splice(index, 1)
    res.writeHead(200, {
      'content-type': 'application/json; charset: utf-8'
    })

    res.end(JSON.stringify(cardToDelete))

    console.log(req.url, req.method)
    const prettyPath = req.url.slice(1)
    // res.end(`<h1> Your request: ${prettyPath}</h1>`)

    if (req.url === '/cards' && req.method === 'GET') {
      res.writeHead(200, {
        'content-type': 'application/json; charset: utf-8'
      })
      res.end(JSON.stringify(cards))
    }

    res.statusCode = 404
    res.end('404 - nothing found')
  }
})

server.listen(3333)
