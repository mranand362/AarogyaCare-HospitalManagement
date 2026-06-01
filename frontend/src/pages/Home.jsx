import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoactors from './../components/TopDoactors'
import Banner from './../components/Banner'
import Footer from './../components/Footer'
import TechMarquee from '../components/TechMarquee'

const Home = () => {
  return (
    <div>
      <Header />
      <TechMarquee />
      <SpecialityMenu />
      <TopDoactors />
      <Banner />
      <Footer />
    </div>
  )
}

export default Home