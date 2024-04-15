import React, { useState } from 'react'
import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Video from './Pages/Video/Video'

const App = () => {

  const [sidebar, setSidebar] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  // Function to toggle button active state
  const toggleButtonActive = () => {
    setButtonActive(!buttonActive);
  };


  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  )
}

export default App
