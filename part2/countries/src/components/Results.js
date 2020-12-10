import React from 'react'

import Country from './Country'

const Results = ({ all, search, setSearch }) => {
    const results = all.filter(country => country.name.includes(search))

    if (results.length > 10) {
        return <p>too many results</p>
    } else if (results.length > 1) {
        return <ul>{
            results.map(country => <li key={country.name}>
                {country.name}
                <button onClick={() => setSearch(country.name)} >show</button>
            </li>)
        }</ul>
    } else if (results.length === 1) {
        return <Country {...results[0]} />
    } else {
        return <p>no results</p>
    }
}

export default Results
