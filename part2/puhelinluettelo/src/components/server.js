import axios from 'axios'

const url = path => `/api${path}`

const getAll = () => axios.get(url('/persons'))

const post = person => axios.post(url('/persons'), person)

const put = (person, id) => axios.put(url(`/persons/${id}`), person)

const del = id => { 
    if(id !== null && id !== undefined) {
        return axios.delete(url(`/persons/${id}`))
    } 
}

export default {
    getAll: getAll,
    post: post,
    put: put,
    del: del
}
