import React, { useState } from 'react'
import { adminNavData } from '../util/data.js'
import RadioCheckbox from './RadioCheckBox.jsx'
import Logo from './Logo.jsx'
import UserProfile from './UserProfile.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const AdminSideNav = ({ setPage, additionalStyles }) => {
  const [checked, setChecked] = useState(false)
  const {theme} = useTheme()

  return (
    <div className={`relative bg-transparent py-3 flex flex-col gap-5 justify-between overflow-hidden hover:w-[290px] hover:min-w-[290px] transition-all ${additionalStyles} ${checked ? 'w-[290px]' : 'w-[70px]'}`} >
      <div>
        <div className='absolute top-2 w-[270px] flex justify-end items-center' >
          <RadioCheckbox checked={checked} setChecked={setChecked} />
        </div>
        <Logo className={'mb-8 mt-10'} />
        {
          adminNavData.map((item, index) => (
            // <Link to={item.link} key={index}>
            <div className={`flex items-center pl-7 gap-8 max-w-[300px] w-[250px] rounded-2xl py-5 ${theme !== 'dark' ? ' hover:bg-black hover:text-white': ' text-white hover:bg-gray-200 hover:text-black'} cursor-pointer transition-colors `} key={index} onClick={() => setPage(item.page)}>
              {React.createElement(item.icon)}
              <h1 className='font-semibold text-[20px]'>{item.text}</h1>
              <hr />
            </div>
            // </Link>
          ))
        }
      </div>
      <UserProfile className={'justify-self-end'} />
    </div>
  )
}

export default AdminSideNav;