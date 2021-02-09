import React, { useState, useEffect } from 'react'

import Creator from './components/Creator'
import Numbers from './components/Numbers'
import Phonebook from './components/Phonebook'
import server from './components/server'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])

    const [notification, setNotification] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const clearNotification = () => setTimeout(() => setNotification(''), 5000)
    const info = msg => {
        setNotification(msg)
        setNotificationType('info')
        clearNotification()
    }
    const err = msg => {
        setNotification(msg)
        setNotificationType('error')
        clearNotification()
    }

    const addPerson = (person) => {
        const found = persons.find(p => p.name === person.name)
        if (found) {
            if (window.confirm('update user?')) {
                server.put(person, found.id).then(updated => {
                    info('updated user')
                    server.getAll().then(res => setPersons(res.data))
                }).catch(e => err(e.toString()))
            }
        } else {
            server.post(person).then(created => {
                info('created user')
                server.getAll().then(res => setPersons(res.data))
            }).catch(e => err(e.toString()))
        }
    }

    const deletePerson = id => {
        if (window.confirm(`delete user?`)) {
            server.del(id).then(() => {
                info('deleted user')
                server.getAll().then(res => setPersons(res.data))
            }).catch(_ => err('person does not exist on server'))
        }
    }

    useEffect(() => {
        server.getAll().then(res => setPersons(res.data))
    }, [])

    const [search, setSearch] = useState('')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const fields = [
        {
            name: 'name',
            value: newName,
            setValue: setNewName
        }, {
            name: 'number',
            value: newNumber,
            setValue: setNewNumber
        }
    ]

    return <div>
        <Notification message={notification} type={notificationType} />
        <Phonebook search={search} setSearch={setSearch} />
        <Creator fields={fields} create={addPerson} />
        <Numbers persons={persons} filter={search} remove={deletePerson} />
    </div>
}

export default App
