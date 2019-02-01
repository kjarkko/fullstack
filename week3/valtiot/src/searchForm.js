import React, { useState, useEffect } from 'react'
import axios from 'axios'
const URL = 'https://restcountries.eu/rest/v2/name/'


const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital} </p>
      <p>population {country.population} </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(
          lang => <li key={lang.iso639_1}>{lang.name}</li>
        )}
        <img src={country.flag} width='500' />
      </ul>
    </div>
  )
}

const Countries = ({list, set}) => {
  return (
    <ul> 
      {list.map(
        c => 
          <li key={c.name}>
            {c.name} 
            <button onClick={() => {set(<Country country={c}/>)}} >show</button>
          </li>
      )} 
    </ul>
  )
}

export const SearchForm = () => {
  const [results, setResults] = useState([])
  const [data,setData] = useState([])

	axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setData(response.data)
    })
  const handleChange = (event) => {
    const val = event.target.value
    const trim = data.filter(country => country.name.includes(val))
    if(trim.length > 10)
      setResults(<p>too many matches</p>)
    else if(trim.length > 1)
      setResults(<Countries list={trim} set={setResults} />)
    else if(trim.length == 1)
      setResults(<Country country={trim[0]}/>)
    else
      setResults(<p>no matches</p>)
  }

  return (
    <div>
      <h3>find countries</h3>
      <input onChange={handleChange} />
      {results}
    </div>
  )
}