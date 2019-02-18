const http = require('http')
const express = require('express')

let persons = [
    {
      name: "blaalbla",
      number: "4645",
      id: 3
    },
    {
      name: "nimi",
      number: "numero",
      id: 4
    }
]

const app = express()

app.get('/', (req,res) => {
  res.send('<h1>hello world<h1>')
})


app.get('/info', (req, res) => {
  res.send(`<p>Puhelinluettelossa ${notes.length} henkilön tiedot <br/> ${new Date().toLocaleDateString('en-US')} </p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(notes)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params['id']
  const hlo = persons.find((i) => id == i)
  if(hlo)
    res.send(hlo)
  else 
    return res.status(404)
})

app.delete('/api/persons/:id', (req,res) => {
  const id = req.params['id']
  
})

app.post('/api/persons/:id', (req,res) => {
  const id = req.params['id']
  
})

const port = 3001
app.listen(port)
console.log(`server running on ${port}`)