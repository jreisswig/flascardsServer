const http = require('http')
const uid = require('uid')

let cards = require('./cards.json')
cards.forEach(card => (card.id = uid()))

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/cards') && req.method === 'DELETE') {
    // /cards/asdf243z
    const id = req.url.replace('/cards/', '')
    const index = cards.findIndex(card => card.id === id)
    const cardToDelete = cards[index]
    cards.splice(index, 1)
    res.writeHead(200, {
      'content-type': 'application/json; charset: utf-8'
    })
    res.end(JSON.stringify(cardToDelete))
  }

  if (req.url === '/cards' && req.method === 'GET') {
    res.writeHead(200, {
      'content-type': 'application/json; charset: utf-8'
    })
    res.end(JSON.stringify(cards))
  }

  res.statusCode = 404
  res.end('404 - nothing found')
})

server.listen(3333)
