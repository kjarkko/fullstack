import React from 'react'

import Weather from './Weather'

const Country = ({name, capital, population, languages, flag}) => <div>
    <h1>{name}</h1>
    <p>capital {capital}</p>
    <p>population { population}</p>
    <h2>languages</h2>
    <ul>
        {languages.map(language => <li key={language}>
            {language}
        </li>)}
    </ul>
    <img src={flag} alt='country flag' />
    <Weather city={capital} />
</div>

export default Country
