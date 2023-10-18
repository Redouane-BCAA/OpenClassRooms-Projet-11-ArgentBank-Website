import React from 'react'
import errorimg from '../assets/404error.webp'
import { NavLink } from 'react-router-dom'

export default function Error() {
  return (
    <div className='errorPage'>
      <img className='errorImg' src={errorimg} alt="404 error image" />
      <h1 className='errorTitle'>Oups, We are soory but the page you requested was not found.</h1>
      <NavLink className="errorLink" to="/">
       link to retur to home page...
      </NavLink>
    </div>
  )
}
