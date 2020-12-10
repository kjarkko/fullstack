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
        if (found !== undefined) {
            if (window.confirm('update user?')) {
                server.patch(person, found.id)
                let copy = [...persons]
                copy[found] = person
                setPersons(copy)
                info('updated user')
            }
        } else {
            server.post(person)
            const copy = [...persons, { ...person }]
            console.log('setting persons to', copy)
            setPersons(copy)
            info('created user')
        }
    }

    const deletePerson = id => {
        if (window.confirm(`delete user?`)) {
            server
                .del(id)
                .then(() => info('deleted user'))
                .catch(_ => err('person does not exist on server'))
            const copy = persons.filter(person => person.id !== id)
            setPersons(copy)
            
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
