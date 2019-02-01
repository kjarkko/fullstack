import React, { useState, useEffect } from 'react'
import {PersonForm} from './personForm'
import {SearchForm} from './searchForm'
import {get, del} from './database'

const Person = ({person, rm}) => (
  <li> 
    {person.name} {person.number}
    <button onClick={() => rm(person)} >poista</button> 
  </li>
)

const Persons = ({persons, rm}) => {
  return (
    <div>
      <h3>Numerot</h3>
      <ul>
        {persons.map(person => <Person key={person.name} person={person} rm={rm} />)}
      </ul>
    </div>
  )
}

const prompt = (msg, set) => {
  set(<Message msg={msg} />)
  setTimeout(() => set(null), 5000)
}
    
const msgStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}
const Message = ({msg}) => (<div style={msgStyle} >{msg}</div>)

export const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [message, setMessage] = useState(null)
  get(setPersons)

  const rm = person => {
    if(!window.confirm(`poistetaanko ${person.name}`))
      return
    const id = person.id
    setPersons(persons.filter(p => p.id != id))
    del(id).catch(err =>{
      prompt(`${person.name} already deleted`, setMessage)
    })
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      {message}
      <SearchForm persons={persons} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <Persons persons={persons} rm={rm} />
    </div>
  )

}

