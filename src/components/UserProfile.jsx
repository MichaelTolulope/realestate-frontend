import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const {theme} = useTheme()
  
    // useEffect(() => {
    //   // const user = localStorage.getItem('user');
    //   if (user) {
    //     setUser(JSON.parse(user))
    //   }
  
    // }, [localStorage])

  // const logOutWithPromise = async () => {
  //   const promise = () =>
  //     new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve({ name: user?.firstname });
  //         setUser(null);
  //         localStorage.clear();
  //         navigate('/');
  //       }, 2000);
  //     });

  //   toast.promise(promise(), {
  //     loading: 'Logging out...',
  //     success: (data) => `${data.name} Logged out`,
  //     error: 'Error logging out',
  //   });
  // };

  return (
    <div className=" mt-2 p-2 rounded-2xl w-[300px] mx-auto">
      <div className={`flex items-center gap-3 p-2 border-b  ${theme === 'dark' ? 'border-gray-800': 'border-gray-100'} mb-2 cursor-pointer`}>
        <div className={` ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                } p-4 rounded-full flex justify-center items-center`}>
          <FaUser />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{user?.firstname + ' ' + user?.lastname}</span>
        </div>
      </div>

      <button
        className="rounded-xl w-full text-left p-2 text-dark hover:bg-gray-100 flex items-center gap-2"
        onClick={logout}
      >
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'
                } p-4 rounded-full flex justify-center items-center`}>
          <FaSignOutAlt className="text-xl" />
        </div>
        <span className="text-[14px] text-dark font-semibold"> Log out </span>
      </button>
    </div>
  );
};

export default UserProfile;
