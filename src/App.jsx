import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './assets/css/main.css'


import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex'



function App() {

  return (
    <Router>
      <section className='app'>
        <AppHeader/>
          <main className='main-layout'>
              <Routes>
                  <Route element={<HomePage />} path="/" />
                  {/* <Route element={<AboutUs />} path="/about" /> */}
                  <Route element={<ToyIndex />} path="/toy" />
                  {/* <Route element={<CarEdit />} path="/car/edit" /> */}
                  {/* <Route element={<CarEdit />} path="/car/edit/:carId" /> */}
                  {/* <Route element={<CarDetails />} path="/car/:carId" /> */}
              </Routes>
          </main>
      </section>
      
      

    </Router>
  )
}

export default App
