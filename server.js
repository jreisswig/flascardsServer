const express = require('express')
const uid = require('uid')

let cards = require('./cards.json')
cards.forEach(card => (card.id = uid()))

const app = express()
app.listen(3334, () => console.log('express ready on Port 3334'))

app.get('/cards', (req, res) => {
  res.json(cards)
})

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = cards.findIndex(card => card.id === id)
  const cardToDelete = cards[index]
  cards.splice(index, 1)
  res.json(cardToDelete)
})
