import React from 'react'
import { Link } from 'react-router'

const Logo = ({className}) => {
  return (
    <div className="pl-5 text-2xl font-bold"><Link to="/" className={`flex gap-[21px] items-center ${className}`}>🏠 <h2>Aruno</h2></Link></div>
  )
}

export default Logo