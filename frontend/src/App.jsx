import { Route, Routes } from "react-router-dom"
import ProductHome from "./pages/ProductHome"
import Footer from "./components/Footer"
import ProductsDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Auth from "./pages/Auth"
import { Toaster } from "react-hot-toast"


function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<ProductHome />} />
        <Route path='/product/:id' element={<ProductsDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
