import React, {useState, useEffect} from 'react'
import axios from 'axios'

const API_KEY = process.env.WEATHER_API_KEY
const BASE_URL = 'http://api.weatherstack.com/current'
const getUrl = city => 
    `${BASE_URL}?access_key=${API_KEY}&query=${city}`

const Weather = ({city}) => {
    const [apiResponse, setResponse] = useState(null)
    useEffect(() => {
        console.log('fetching weather data for', city)
        if (city === null || city === undefined || city === '') {
            return
        }
        axios.get(getUrl(city)).then(res => {
            setResponse(res.data)
        })
    }, [])

    return (apiResponse !== null && apiResponse.success !== false) ? <div>
        <h1>Weather for {apiResponse.location.name}</h1>
        <b>temperature</b><p>{apiResponse.current.temperature}</p>
        <img src={apiResponse.current.weather_icons[0]} alt='weather icon' />
        <b>wind</b>
        <p>{apiResponse.current.wind_speed} mph {apiResponse.current.wind_dir}</p>
    </div> : <p>no weather data found</p>
}

export default Weather
