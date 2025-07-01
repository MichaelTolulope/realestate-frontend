import React from 'react'
import { Link } from 'react-router'

const Logo = ({className}) => {
  return (
    <div className="md:pl-5 text-2xl font-bold"><Link to="/" className={`flex md:gap-[21px] items-center ${className}`}>🏠 <h2 className='text-[14px] md:text-[16px] max-w-[200px] md:max-w-auto text-center leading-3 md:leading-normal'>Mydahsoft Homes</h2></Link></div>
  )
}

export default Logo