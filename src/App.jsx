import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import Home from './pages/Home'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Properties from './pages/Properties'
import SinglePropertyPage from './pages/SinglePropertyPage'
import { Toaster } from 'sonner'
import AddProperty from './pages/AddProperty'
import { AuthUserContext } from './context/AuthContext'
import {ThemeContextProvider} from './context/ThemeContext'
import SingleProperty from './components/SIngleProperty'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/header'
import AdminPage from './pages/AdminPage'
import ThemeTransition from './components/ThemeTransition'

const App = () => {
  const location = useLocation()
  const queryClient = new QueryClient();
  const [user, setUser] = useState()
  return (

    <QueryClientProvider client={queryClient}>
      <AuthUserContext.Provider value={{ user, setUser }}>
        <ThemeContextProvider>
        <ThemeTransition/>
        <div className='flex flex-col h-[100vh] max-w-[100vw] box-border'>
          <Toaster richColors position='top-right' />
          {
            !location.pathname.includes('admin-dashboard')
            &&
            <Header />
            
          }
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
                  <AdminPage />
                </AnimationWrapper>
              } />
            </Routes>
          </AnimatePresence>
        </div>
        </ThemeContextProvider>
      </AuthUserContext.Provider>
    </QueryClientProvider>
  )
}

export function AnimationWrapper({ children }) {
  return (
    <motion.div className='box-border'
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