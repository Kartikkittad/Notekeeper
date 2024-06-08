import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';
import Navbar from './components/navbar';
// import MainBody from './components/mainPage';
import NoteManager from './components/NoteMangaer';
import { ToastContainer } from 'react-toastify';

function App() {
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className='con'>
      <Navbar onColorSelect={handleColorSelect} />
      {/* <MainBody /> */}
      <NoteManager selectedColor={selectedColor} />
      <ToastContainer />
    </div>

  )
}

export default App
