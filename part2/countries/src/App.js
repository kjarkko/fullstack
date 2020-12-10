import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Input from './components/Input'
import Results from './components/Results'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState('')

  const mapCountries = allCountries => allCountries.map(country => ({
    name: country.name,
    capital: country.capital,
    population: country.population,
    languages: country.languages.map(lang => lang.name),
    flag: country.flag
  }))

  const apiUrl = 'https://restcountries.eu/rest/v2/all'

  useEffect(() => {
    axios.get(apiUrl).then(res => {
      setAllCountries(mapCountries(res.data))
    })
  }, [])

  return <div>
    <p>find countries</p>
    <Input text={search} setText={setSearch} />
    <Results 
      all={allCountries} 
      search={search} 
      setSearch={setSearch}
    />
  </div>
}

export default App;
