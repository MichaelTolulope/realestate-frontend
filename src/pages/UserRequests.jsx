import React from 'react'
import RequestTable from '../components/RequestTable'
import { FaSearch } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const UserRequests = () => {
    const { theme } = useTheme()
    return (
        <div>
            <div className='flex justify-between items-center px-3 mt-3 mb-5'>
                <h2 className='text-[20px] font-bold'>User Requests</h2>
                <div className={`flex items-center rounded-3xl gap-5 pl-2 pr-4 py-2  w-[200px] border-2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                    <div className='bg-transparent p-2 rounded-full flex justify-center items-center'>
                        <FaSearch className={`cursor-pointer text-gray-500`} />
                    </div>
                    <input placeholder='Search...' type="text" spellCheck={false} className={`w-full outline-none bg-transparent `} />
                </div>
            </div>
            <div className=' w-[full] overflow-x-auto'>
                <RequestTable />
            </div>
        </div>
    )
}

export default UserRequests