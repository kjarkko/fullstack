import React from 'react'
import Header from './Header'
import Person from './Person'

const Persons = ({persons, filter, remove}) => <ul>{
    persons
        .filter(person => person.name.includes(filter))
        .map(person => <li key={person.id}><Person {...person} remove={remove} /></li> )
}</ul>

const Numbers = ({persons, filter, remove}) => {
    return <div>
        <Header text='Numbers' />
        <Persons persons={persons} filter={filter} remove={remove} />
    </div>
}

export default Numbers
