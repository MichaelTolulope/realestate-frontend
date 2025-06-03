import React from 'react'
import { Link } from 'react-router'
import { useTheme } from '../context/ThemeContext'

const MiniCard = ({ title, children, value,link }) => {
    const {theme} = useTheme()
    return (
        <div className={`flex-1 rounded-2xl shadow-2xl p-5  flex flex-col gap-3 min-w-[100px] max-w-full ${theme ==='dark'? 'bg-black shadow-sm shadow-white':'bg-white'}`}>
            <div className='flex gap-3 items-center'>
                <div className={` rounded-lg p-1 ${theme === 'dark'?'bg-gray-800 text-gray-100':'bg-gray-100 text-gray-400'} `}>
                    {children}
                </div>
                <h3 className={`text-[14px] ${theme === 'dark'?' text-gray-100':' text-black'}`}>{title}</h3>
            </div>

            <h1 className={`text-[20px] font-semibold  ${theme === 'dark'?' text-gray-100':' text-black'}`}>{value}</h1>
            <Link to={link} className={`underline ${theme === 'dark'?' text-gray-100':' text-black'}`}>See all</Link>
        </div>

    )
}

export default MiniCard