import { FaBell, FaSearch } from 'react-icons/fa'
import GreetUser from './GreetUser'
import DarkModeButton from './DarkModeButton'
import { useTheme } from '../context/ThemeContext'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'

const AdminHeader = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const { theme } = useTheme()
    return (
        <div className='h-[10%] flex justify-between gap-5 p-5 md:pr-3 items-center'>
            <div className={`hidden md:flex items-center rounded-3xl gap-5 pl-2 pr-4 py-2  w-[50%]  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                <div className='bg-transparent p-2 rounded-full flex justify-center items-center'>
                    <FaSearch className={` cursor-pointer text-gray-500`} />
                </div>
                <input placeholder='Search...' type="text" spellCheck={false} className={`w-full outline-none bg-transparent `} />
            </div>
            <MdMenu className='text-[32                                                                                                                                px] block md:hidden cursor-pointer' onClick={
                () => {
                    setShowMobileMenu(!showMobileMenu)
                }
            } />
            <AnimatePresence>
                {showMobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-5 md:hidden fixed top-2 right-0 bg-white rounded-2xl p-3 shadow-lg overflow-hidden z-10 justify-between w-[70%]"
                    >
                        <MdClose
                            className="text-[24px] block md:hidden self-end cursor-pointer mt-2 mb-10"
                            onClick={() => setShowMobileMenu(false)}
                        />

                        <div className={`md:hidden flex items-center rounded-3xl gap-5 pl-2 pr-4 py-2  w-[50%]  ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                            <div className='bg-transparent p-2 rounded-full flex justify-center items-center'>
                                <FaSearch className={` cursor-pointer text-gray-500`} />
                            </div>
                            <input placeholder='Search...' type="text" spellCheck={false} className={`w-full outline-none bg-transparent `} />
                        </div>
                        <ul className="flex flex-col gap-3 text-gray-600 flex-1">
                            {/* <Logo /> */}
                            <li className={`transition-colors duration-200 pl-5 rounded-xl cursor-pointer py-5 pr-3 hover:bg-gray-100`}>
                                <Link to="/" className={`hover:text-black `}>Home</Link>
                            </li>
                            <li className={`${path === '/properties' ? 'bg-gray-100' : 'bg-white'} pl-5 rounded-xl cursor-pointer py-5 pr-3 hover:bg-gray-100`}>
                                <Link to="/properties" className={`hover:text-black`}>Properties</Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-col md:flex-row justify-end gap-7 w-[50%]">
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