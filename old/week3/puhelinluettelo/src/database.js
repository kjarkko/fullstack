import axios from 'axios'
import React from 'react'
import {useEffect} from 'react'

const URL = '/api/persons/'

const effect = (fn) => useEffect(fn,[])

export const get = (set) => {
  effect(() => {
    axios
    .get(URL)
    .then(response => {
      console.log(response)
      set(response.data)
    })
  })
}

export const put = obj => 
  axios.put(URL, obj).then(res => console.log(res))

export const post = obj => 
	axios.post(URL, obj).then(res => console.log(res))

export const del = id => 
  axios.delete(URL.concat(`${id}`)).then(res => console.log(res))

