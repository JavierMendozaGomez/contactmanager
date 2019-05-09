import React from 'react'

export default function About (props) {
  return (
    <div>
      <h1 className="display-4">
        About Contact Manager</h1>
      <h1>{props.match.params.id}</h1>
    </div>
  )
}
