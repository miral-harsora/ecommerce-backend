
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Footer from './components/Footer'
import SelectedProducts from './pages/SelectedProducts'
import ProductDetail from './pages/ProductDetail'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import InfoPage from './pages/InfoPage'
import Profile from './pages/Profile'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProducts } from './action'

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const dispatch= useDispatch();
  useEffect(() => {
       dispatch(getProducts());
  }, [dispatch]);
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const hideFooterRoutes = ['/login', '/cart']
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  return (
    console.log("navbarHeight",navbarHeight),
    <>
      <Navbar setNavbarHeight={setNavbarHeight}/>
      <Routes>
        <Route path="/" element={<Home navbarHeight={navbarHeight}/>} />
        <Route path="/home" element={<Home navbarHeight={navbarHeight}/>} />
        <Route path="/cart" element={<Cart  />} />
        <Route path="/wishlist" element={<Wishlist   navbarHeight={navbarHeight}/>}/>
        <Route path="/login" element={<Login  navbarHeight={navbarHeight}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs  navbarHeight={navbarHeight}/>} />
        <Route path="/contact" element={<Contact  navbarHeight={navbarHeight}/>} />
        <Route path="/faqs" element={<FAQ  navbarHeight={navbarHeight}/>} />
        <Route path="/services" element={<InfoPage />} />
        <Route path="/how-to-shop" element={<InfoPage />} />
        <Route path="/payment-methods" element={<InfoPage />} />
        <Route path="/money-back-guarantee" element={<InfoPage />} />
        <Route path="/returns" element={<InfoPage />} />
        <Route path="/shipping" element={<InfoPage />} />
        <Route path="/terms" element={<InfoPage />} />
        <Route path="/privacy" element={<InfoPage />} />
        <Route path="/track-order" element={<InfoPage />} />
        <Route path="/help" element={<InfoPage />} />
        <Route path="/category/:name" element={<SelectedProducts navbarHeight={navbarHeight}/>} />
        <Route path="/:name" element={<SelectedProducts navbarHeight={navbarHeight}/>} />
        <Route path="/products/:id" element={<ProductDetail  navbarHeight={navbarHeight}/>} />
      </Routes>
      {!shouldHideFooter && <Footer >

      </Footer>}
    </>


  )
}

export default AppWrapper
