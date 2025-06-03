import React, { useContext } from 'react'
import { FaChevronDown, FaUser } from 'react-icons/fa'
import { AuthUserContext } from '../context/AuthContext';
import { ThemeContext, useTheme } from '../context/ThemeContext';


const GreetUser = () => {
    const { user, setUser } = useContext(AuthUserContext);
    const {theme} = useTheme()
    return (
        <div className='flex gap-3 items-center'>
            <h2 className={`${theme === 'dark' ? 'text-white':'text-black'} text-2xl cursor-pointer`}>Hi, <span className='font-bold'>{user?.firstname}</span></h2>
            <div className={`p-4 rounded-full flex justify-center items-center cursor-pointer ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>
                <FaUser />
            </div>
        </div>
    )
}

export default GreetUser