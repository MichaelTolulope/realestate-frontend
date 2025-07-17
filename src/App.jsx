import {Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Properties from './pages/Properties'
import SinglePropertyPage from './pages/SinglePropertyPage'
import { Toaster } from 'sonner'
import AddProperty from './pages/AddProperty'
import { AuthUserProvider } from './context/AuthContext'
import { ThemeContextProvider } from './context/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import AdminPage from './pages/AdminPage'
import ThemeTransition from './components/ThemeTransition'
import { ProtectedRoute } from './components/ProtectedRoute'
import PreventBack from './components/PreventBack'

const App = () => {
  const location = useLocation()
  const queryClient = new QueryClient();

  const hiddenPaths = ["/signin", "/signup", "/admin-dashboard"];
   const shouldShowHeader = !hiddenPaths.some((path) =>
    location.pathname.includes(path)
  );
  return (

    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <ThemeContextProvider>
          <ThemeTransition />
          <div className='flex flex-col h-[100vh] max-w-[100vw] box-border'>
            <Toaster richColors position='top-right' />
            {shouldShowHeader && <Header />}
            <AnimatePresence mode='wait'>
              <Routes location={location} key={location.pathname}>
                <Route path='/' element={
                  <AnimationWrapper>
                    <Home />
                  </AnimationWrapper>
                } />
                <Route path='/signup' element={
                  <AnimationWrapper>
                    <Signup />
                  </AnimationWrapper>
                } />
                <Route path='/signin' element={
                  <AnimationWrapper>
                    <Signin />
                  </AnimationWrapper>
                } />
                <Route path='/properties' element={
                  <AnimationWrapper>
                    <Properties />
                  </AnimationWrapper>
                } />
                <Route path='/properties/:id' element={
                  <AnimationWrapper>
                    <SinglePropertyPage />
                  </AnimationWrapper>
                } />
                <Route path='/properties/add' element={
                  <AnimationWrapper>
                    <AddProperty />
                  </AnimationWrapper>
                } />
                <Route path='/admin-dashboard' element={
                  <AnimationWrapper>
                    <ProtectedRoute>
                      <PreventBack/>
                      <AdminPage />
                    </ProtectedRoute>
                  </AnimationWrapper>
                } />
              </Routes>
            </AnimatePresence>
          </div>
        </ThemeContextProvider>
      </AuthUserProvider>
    </QueryClientProvider>
  )
}

export function AnimationWrapper({ children, additionalStyles }) {
  return (
    <motion.div className={`${additionalStyles}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default App