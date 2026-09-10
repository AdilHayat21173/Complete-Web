import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Faculty from './Pages/Faculty'
import Contact from './Pages/ContactUs'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/faculty' element={<Faculty/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        
      </Routes>
    </div>
  )
}

export default App