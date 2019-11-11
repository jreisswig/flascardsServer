const express = require('express')
const uid = require('uid')

let cards = require('./cards.json')
cards.forEach(card => (card.id = uid()))

const app = express()
app.use(express.json())
app.listen(3334, () => console.log('express ready on Port 3334'))

app.get('/cards', (req, res) => {
  res.json(cards)
})

app.get('/cards/:id', (req, res) => {
  const id = req.params.id
  const card = cards.find(card => card.id === id)
  res.json(card)
})

app.post('/cards', (req, res) => {
  console.log(req.body)
  const newCard = req.body
  newCard.id = uid()
  cards = [...cards, newCard]
  res.json(cards)
})

app.patch('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = cards.findIndex(card => card.id === id)

  let cardToEdit = cards[index]
  cardToEdit = { ...cards[index], ...req.body }
  // console.log(cardToEdit)
  res.json(cardToEdit)
})

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = cards.findIndex(card => card.id === id)
  const cardToDelete = cards[index]
  cards.splice(index, 1)
  res.json(cardToDelete)
})
