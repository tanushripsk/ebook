import React from 'react'

const Alert = (props) => {
  return (
    <div>
      <div className='alert alert-success'>
        <strong>{props.message}</strong>
      </div>
    </div>
  )
}

export default Alert
