import React, { useState } from 'react'
import {post} from './database'

const msgStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}
const Message = ({msg}) => (<div style={msgStyle} >{msg}</div>)

const prompt = (msg, set) => {
	set(<Message msg={msg} />)
	setTimeout(() => set(null), 5000)
}

export const PersonForm = ({persons, setPersons}) => {
	const defaultName = 'nimi'
	const defaultNum = 'numero'
	const [ newName, setNewName ] = useState(defaultName)
	const [ newNum, setNewNum ] = useState(defaultNum)
	const [message, setMessage] = useState(null)
      
	const addPerson = (event) => {
	  event.preventDefault()
	  const person = {
	    name: newName,
	    number: newNum
	  }
	  if (persons.some(p => p.name === person.name)){
			//alert(`${newName} on jo luettelossa`)
			const prompt = `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
			if(window.confirm(prompt))
				setPersons(
					persons.filter(p => p.name !== person.name).concat(person)
				)
			
	  }else{
			setPersons(persons.concat(person))
			post(person)
			setNewName(defaultName)
			setNewNum(defaultNum)
		}
		prompt(`Lisättiin ${person.name}`, setMessage)
	}
	const handlePersonChange = (event) => {
	  setNewName(event.target.value)
	}
	const handleNumChange = (event) => {
	  setNewNum(event.target.value)
	}
	return(
	  <div>
	    <h3>Uusi henkilö</h3>
			{message}
	    <form onSubmit={addPerson}>
	      <input value={newName} onChange={handlePersonChange} /> 
	      <input value={newNum} onChange={handleNumChange} /> 
	      <button type="submit">lisää</button>
	    </form>
	  </div>
	)
}