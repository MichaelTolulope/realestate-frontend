import React from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'
import GreetUser from './GreetUser'
import DarkModeButton from './DarkModeButton'
import { useTheme } from '../context/ThemeContext'

const AdminHeader = () => {
    const {theme} = useTheme()
    return (
        <div className='h-[10%] flex justify-between gap-5 pr-3 items-center'>
            <div className={`flex items-center rounded-3xl gap-5 pl-2 pr-4 py-2  w-[50%]  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                <div className='bg-transparent p-2 rounded-full flex justify-center items-center'>
                    <FaSearch className={`cursor-pointer text-gray-500`} />
                </div>
                <input placeholder='Search...' type="text" spellCheck={false} className={`w-full outline-none bg-transparent `} />
            </div>
            <div className="flex justify-end gap-7 w-[50%]">
                <GreetUser />
                <div>
                    <div className={`p-4 rounded-full flex justify-center items-center cursor-pointer ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-800'
                        }`}>
                        <FaBell className=' rotate-5' />
                    </div>
                </div>
                <DarkModeButton />
            </div>
        </div>
    )
}

export default AdminHeader