import React from 'react'

import './notification.css'

const Notification = ({message, type}) => {
    if (message !== '') {
        return <div className={type} >
            {message}
        </div>
    } else {
        return <div />
    }
}

export default Notification
