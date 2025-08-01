import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Footer from './components/Footer'
import MedicalTopTenGov from './Pages/MedicalTopTenGov'
import MedicalTopTenPvt from './Pages/MedicalTopTenPvt'
import CollegeProfile from './Pages/CollegeProfile'
import AdminPage from './Pages/AdminPage'
import DentalTopTenGov from './Pages/DentalTopTenGov'
import DentalTopTenPvt from './Pages/DentalTopTenPvt'



const App = () => {
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/medical/government' element={<MedicalTopTenGov/>}/>
        <Route path='/medical/private' element={<MedicalTopTenPvt/>}/>
        <Route path='/college/:collegeSlug' element={<CollegeProfile/>}/>
        <Route path='/dental/government' element={<DentalTopTenGov/>}/>
        <Route path='/dental/private' element={<DentalTopTenPvt/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
