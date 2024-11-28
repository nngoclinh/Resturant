import React from 'react'
import { Link } from 'react-router-dom'
export default function unauthorized() {
  return (
    <div> You are unauthorized
        <Link to="/"> Back to home page</Link>
    </div>
  )
}
