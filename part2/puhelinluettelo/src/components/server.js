import axios from 'axios'

const url = path => `http://localhost:3001${path}`

const getAll = () => axios.get(url('/persons'))

const post = person => axios.post(url('/persons'), person)

const patch = (person, id) => axios.patch(url(`/persons/${id}`), person)

const del = id => { 
    if(id !== null && id !== undefined) {
        return axios.delete(url(`/persons/${id}`))
    } 
}

export default {
    getAll: getAll,
    post: post,
    patch: patch,
    del: del
}
