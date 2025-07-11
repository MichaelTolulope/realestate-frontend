import { useState } from 'react'
import AdminSideNav from '../components/AdminSideNav'
import { AnimationWrapper } from '../App'
import Dashboard from './Dashboard'
import { useTheme } from '../context/ThemeContext'
import AdminHeader from '../components/AdminHeader'
import UserRequests from './UserRequests'

const AdminPage = () => {
  const [page, setPage] = useState('dashboard')
  const { theme } = useTheme()

  return (
    <div className={` h-[100vh] w-full box-border ${theme === 'dark' ? 'bg-black' : 'bg-gray-200'}  flex py-2 md:pr-2`}>
      <AdminSideNav setPage={setPage} additionalStyles="hidden md:block"/>
      <div className='flex flex-col gap-3 flex-1 h-full box-border '>

        <AdminHeader/>
        <div className={`overflow-hidden h-[90%] rounded-2xl p-3 ${theme === 'dark'?'bg-gray-900 text-gray-100':' text-black bg-white'}`}>
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