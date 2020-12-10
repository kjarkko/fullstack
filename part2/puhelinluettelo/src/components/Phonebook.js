import React from 'react'
import Header from './Header'
import Input from './Input'

const Filter = ({search, setSearch}) => <div>
    <p>filter shown with</p>
    <Input value={search} setValue={setSearch} />
</div>

const Phonebook = ({search, setSearch}) => {
    return <div>
        <Header text='Phonebook' />
        <Filter search={search} setSearch={setSearch} />
    </div>
}

export default Phonebook
