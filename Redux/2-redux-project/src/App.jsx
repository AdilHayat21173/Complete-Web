
import Home from './pages/HomePage';
import CollectionPages from './pages/CollectionPages';
import Navbar from './Components/Navbar'
import {Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <div className='min-h-screen text-white w-full bg-gray-950'>
      
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<CollectionPages />} />
      </Routes>
      <ToastContainer />

    </div>
  )
};

export default App;