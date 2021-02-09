import React from 'react'

const Person = ({name, number, id, remove}) => {
    return <div>
        <p>{name}</p>
        <p>{number}</p>
        <button onClick={(event) => {
            event.preventDefault()
            remove(id)
        }}>delete</button>
    </div>
}

export default Person
