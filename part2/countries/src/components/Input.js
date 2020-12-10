import React from 'react'

const Input = ({text, setText}) => <input
    value={text}
    onChange={event => setText(event.target.value)}
/>

export default Input
