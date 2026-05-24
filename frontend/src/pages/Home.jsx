import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoactors from './../components/TopDoactors';
import Banner from './../components/Banner';
import Footer from './../components/Footer';
import { Routes } from 'react-router-dom';
import TechMarquee from '../components/TechMarquee';


const home = () => {
  return (
    <div>
      
      <Header/>
      <TechMarquee />
      <SpecialityMenu/>
      <TopDoactors />
      <Banner />
      <Footer/>
      <Routes>
        
      </Routes>
      
    </div>
  )
}

export default home
