import React, { useState } from 'react'


export const SearchForm = ({persons}) => {
  const [ results, setResults ] = useState([])
  const handleChange = (event) => {
    const text = event.target.value
    if(text === ''){
      setResults([])
    }else{
      setResults(persons.filter(
        p => p.name.includes(text) || p.number.includes(text))
      )
    }
  }
  return (
    <div>
      <h3>Etsi</h3>
      <input onChange={handleChange} />
      <ul>
        {results.map(res => <li key={res.name} > {res.name} {res.number} </li>)}
      </ul>
    </div>
  )
}