
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

//Routes agrupa varias paginas, y route allows us to create a single page
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import ViajeForm from './pages/ViajeForm'

import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { useState, useEffect } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'


import { fetchViajes } from './api/viajes'


function App() {

  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    fetchViajes()
      .then(res => {
        setViajes(res.data)
      })
      .catch(err => console.log(err))

    // async function fetchViajes() {
    //     const res = await axios.get("http://localhost:8000/api/viajes");
    //     // console.log(res);
    //     setViajes(res.data);
    // }

    // fetchViajes();
  }, []);



  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(viajes)

  return (
    <BrowserRouter>
      <div className='container mx-auto px-10'>
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="viajes/:id" element={<ViajeForm />} />
          <Route path="viajes/new" element={<ViajeForm />} />

          {/* Ruta para renderizar todo el contenido bajo una sola vista */}
          <Route
            path="/tienda"
            element={
              <CartProvider>
                <Header />
                <Cart />
                <Products products={filteredProducts} />
                {IS_DEVELOPMENT && <Footer />}
              </CartProvider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App
