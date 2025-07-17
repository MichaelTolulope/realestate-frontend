import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext';
import { FaChevronDown, FaSignOutAlt, FaUser } from 'react-icons/fa'
import AddProperty from '../pages/AddProperty';
import { toast } from 'sonner'
import { useNavigate } from 'react-router';
import Logo from './Logo';
import { MdClose, MdMenu } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate()
  const path = location.pathname;
  const [showAddListingForm, setShowAddListingPage] = useState(false)
  const { user, logout } = useAuth();
  const [success, setSuccess] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)


  useEffect(() => {
    if (success) {
      toast.success("New property added, await approval")
    }
  }, [success])



  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <Logo />
      <ul className="hidden md:flex gap-6 text-gray-600 flex-1 justify-center">
        <li><Link to="/" className={`hover:text-black ${path === '/' ? 'text-black font-semibold' : 'text-gray-600'}`}>Home</Link></li>
        <li><Link to="/properties" className={`hover:text-black ${path === '/properties' ? 'text-black font-semibold' : 'text-gray-600'}`}>Properties</Link></li>
      </ul>
      <div className='hidden md:flex gap-5 items-center'>
        {
          user &&
          <>
            <div className='flex gap-3 items-center'>
              <h2 className='text-2xl cursor-pointer'>Hi, <span className='font-bold'>{user?.firstname}</span></h2>
              <div className='bg-gray-100  p-4 rounded-full flex justify-center items-center relative group'>
                <FaUser />
                <div className="bg-[#f0f2f5] border-white border-2 rounded-full w-fit h-fit p-[1.5px] absolute right-[-1px] bottom-[-3px]">
                  <FaChevronDown className="text-[10px]" />

                  <div className="bg-white shadow-lg mt-2 p-2 rounded-2xl w-[300px] mx-auto absolute top-0 right-1 hidden group-hover:block ">
                    <Link to={'/admin-dashboard'}>
                      <div className="flex items-center gap-3 p-2 border-b border-gray-100 mb-2 cursor-pointer">
                        {/* <img
                          src={profilePic}
                          alt="Profile"
                          className="w-12 h-12 rounded-full"
                        /> */}
                        <div className='bg-gray-100  p-4 rounded-full flex justify-center items-center'>
                          <FaUser />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">{user.firstname + ' ' + user.lastname}</span>

                        </div>
                      </div>
                    </Link>
                    <button className="rounded-xl w-full text-left px-4 py-2 text-dark hover:bg-gray-100 flex items-center gap-2">
                      <div className="w-[40px] h-[40px] bg-[#f0f2f5] flex items-center justify-center rounded-full">
                        <FaSignOutAlt className="text-xl" />
                      </div>
                      <span className="text-[14px] text-dark font-semibold" onClick={logout}> Log out </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-black text-white px-5 py-[9px] rounded-2xl" onClick={() => {
              setShowAddListingPage(!showAddListingForm)
            }}>
              Add Property
            </button>
          </>
          // :
          // <>
          //   <button className="bg-black text-white px-5 py-[9px] rounded-2xl">
          //     <Link to={'/signin'}>login</Link>
          //   </button>
          //   <button className="border-black text-black border-2 px-4 py-2 rounded-2xl">
          //     <Link to={'/signup '}>Sign Up</Link>

          //   </button>
          // </>
        }
      </div>
      {
        showAddListingForm &&

        (
          user &&
          <AddProperty show={setShowAddListingPage} setSuccess={setSuccess} />

        )


      }
      <MdMenu className='text-[24px] block md:hidden cursor-pointer' onClick={
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

            <ul className="flex flex-col gap-3 text-gray-600 flex-1">
              <Logo />
              <li className={`${path === '/' ? 'bg-gray-100' : 'bg-white'} transition-colors duration-200 pl-5 rounded-xl cursor-pointer py-5 pr-3 hover:bg-gray-100`}>
                <Link to="/" className={`hover:text-black ${path === '/' ? 'text-black font-semibold' : 'text-gray-600'}`}>Home</Link>
              </li>
              <li className={`${path === '/properties' ? 'bg-gray-100' : 'bg-white'} pl-5 rounded-xl cursor-pointer py-5 pr-3 hover:bg-gray-100`}>
                <Link to="/properties" className={`hover:text-black ${path === '/properties' ? 'text-black font-semibold' : 'text-gray-600'}`}>Properties</Link>
              </li>
            </ul>

            {user && (
              <div className='flex flex-col gap-5'>
                <hr className='mt-20 mb-5' />
                <Link to={'/admin-dashboard'}>
                  <div className='flex gap-5 items-center'>
                    <div className='bg-gray-100 p-4 rounded-full flex justify-center items-center'>
                      <FaUser />
                    </div>
                    <h2 className='text-2xl cursor-pointer'>Hi, <span className='font-bold'>{user?.firstname}</span></h2>
                  </div>
                </Link>
                <button
                  className="bg-black text-white px-5 py-[9px] rounded-2xl"
                  onClick={() => setShowAddListingPage(!showAddListingForm)}
                >
                  Add Property
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    // <div className='flex justify-between shadow-md border-b-2 py-3 bg-red-700'>
    //     <div>
    //         <Link to='/' className={`${path === '/' ? 'text-primary': 'text-zinc-500'}`}>Home</Link>
    //         <Link to='/' className={`${path === '/properties' ? 'text-primary': 'text-zinc-500'}`}>Properties</Link>
    //         <Link to='/' className={`${path === '/#faq' ? 'text-primary': 'text-zinc-500'}`}>FAQs</Link>
    //         <Link to='/' className={`${path === '/#about' ? 'text-primary': 'text-zinc-500'}`}>About US</Link>
    //     </div>
    //     <div>logo</div>
    //     <div>
    //       <p>contact Us</p>
    //       <p>Book a Call</p>
    //     </div>
    // </div>
  )
}

export default Header