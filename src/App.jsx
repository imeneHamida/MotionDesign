import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home'
import Galery from './components/Galery'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <div>
      <Navbar />
      <Home/>
      <About />
      <Galery />
      <Contacts />
      <Footer />
      </div>
  )
}

export default App
