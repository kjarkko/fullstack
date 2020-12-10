import React from 'react'
import Header from './Header'
import Input from './Input'

const Fields = ({fields}) => <ul>{
    fields.map(field => <li key={field.name}>
        <p>{field.name}:</p>
        <Input value={field.value} setValue={field.setValue} />
    </li>)
}</ul>

const submitFn = (fields, create) => event => {
    event.preventDefault()
    const created = Object.fromEntries(
        fields.map(field => [field.name, field.value])
    )
    console.log('form submitted', created)
    create(created)
}

const Form = ({fields, create}) => {
    return <form onSubmit={submitFn(fields, create)}>
        <Fields fields={fields} />
        <button type="submit">add</button>
    </form>
}

const Creator = ({fields, create}) => {
    return <div>
        <Header text='add a new person' />
        <Form fields={fields} create={create} />
    </div>
}

export default Creator
