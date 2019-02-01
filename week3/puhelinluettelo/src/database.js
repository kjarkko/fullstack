import axios from 'axios'
import React from 'react'
import {useEffect} from 'react'

const URL = 'http://localhost:3001/'

const effect = (fn) => useEffect(fn,[])

export const get = (set) => {
  effect(() => {
    axios
    .get(URL.concat('db'))
    .then(response => {
      console.log(response)
      set(response.data.persons)
    })
  })
}

export const put = obj => 
  axios.put(URL.concat('persons'), obj).then(res => console.log(res))

export const post = obj => 
	axios.post(URL.concat('persons'), obj).then(res => console.log(res))

export const del = id => 
  axios.delete(URL.concat(`persons/${id}`)).then(res => console.log(res))

