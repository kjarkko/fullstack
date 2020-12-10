import React from 'react'

const Input = ({value, setValue}) => <input
    value={value}
    onChange={event => setValue(event.target.value)}
/>

export default Input
