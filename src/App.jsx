import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './assets/css/main.css'


import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex'
import { ToyEdit } from './pages/ToyEdit'



function App() {

  return (
    <Router>
      <section className='app'>
        <AppHeader/>
          <main className='main-layout'>
              <Routes>
                  <Route element={<HomePage />} path="/" />
                  {/* <Route element={<AboutUs />} path="/about" /> */}
                  <Route path="/toy" element={<ToyIndex />}>
                      <Route path="edit" element={<ToyEdit />} />
                      <Route path="edit/:toyId" element={<ToyEdit />} />
                  </Route>
                  {/* <Route element={<CarDetails />} path="/car/:carId" /> */}
              </Routes>
          </main>
      </section>
      
      

    </Router>
  )
}

export default App
