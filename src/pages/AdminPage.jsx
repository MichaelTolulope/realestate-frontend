import React, { useState } from 'react'
import AdminSideNav from '../components/AdminSideNav'
import { AnimationWrapper } from '../App'
import GreetUser from '../components/GreetUser'
import { FaBell, FaSearch } from 'react-icons/fa'
import Dashboard from './Dashboard'
import DarkModeButton from '../components/DarkModeButton'
import { useTheme } from '../context/ThemeContext'
import ThemeTransition from '../components/ThemeTransition'
import AdminHeader from '../components/AdminHeader'
import UserRequests from './UserRequests'

const AdminPage = () => {
  const [page, setPage] = useState('dashboard')
  const { theme } = useTheme()

  return (
    <div className={` h-[100vh] box-border ${theme === 'dark' ? 'bg-black' : 'bg-gray-200'}  flex py-2 pr-2`}>
      <AdminSideNav setPage={setPage} />
      <div className='flex flex-col gap-3 flex-1 h-full box-border'>

        <AdminHeader/>
        <div className={` h-[90%] rounded-2xl p-3 ${theme === 'dark'?'bg-gray-900 text-gray-100':' text-black bg-white'}`}>
          {
            page === "settings" &&
            <AnimationWrapper>
              <div className=''>
                <h2>Settings</h2>
              </div>
            </AnimationWrapper>
          }
          {
            page === "dashboard" && <AnimationWrapper><Dashboard /></AnimationWrapper>
          }
          {
            page === "requests" && <AnimationWrapper><UserRequests/></AnimationWrapper>
          }
        </div>

      </div>
    </div>
  )
}

export default AdminPage