import '../index.css';
import './css/navbar.css'
import './css/footer.css'
import './css/sidebar.css'
import './css/profile.css'
import './css/clothing.css'
import './css/specialProduct.css'
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import DefaultProvider from '../contexts/DefaultContext';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './MainComponents/Navbar';
import Footer from './MainComponents/Footer';
import Sidebar from './MainComponents/Sidebar';
import Main from './MainComponents/Main';

import Test from './SmallComponents/Test';
import Checkout from './Layout/Checkout'
import ScrollToTop from './SmallComponents/ScrollToTop';
import ForgotPassword from './SmallComponents/ForgotPassword';
import ResendEmail from './SmallComponents/ResendEmail';
import Help from './SmallComponents/Help';
import NotFound from './SmallComponents/NotFound';


import Command from './Layout/Command'
import Connect from './Layout/Connect';
import Profile from './Layout/Profile'
import Favorite from './Layout/Favorite'
import Cart from './Layout/Cart';


import SpecialProduct from './Layout/SpecialProduct';
import Clothing from './Layout/Clothing'

import PrivateRoute from '../CustomHook/PrivateRoute';
import AdminRoute from '../CustomHook/AdminRoute'

import Admin from './Admin/Admin';
import AdminCommands from '../components/Admin/AdminCommands'
import AdminDiscount from './Admin/AdminDiscount';
import AdminErrors from './Admin/AdminErrors';

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
)
const GoTo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/main');
  }, []);
  return (<></>)
}
const SecondLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DefaultProvider>
          <ScrollToTop />
          <Routes>
            <Route path='/' index element={<GoTo />} />
            <Route path='/connect' element={<Connect />} />
            <Route path='/test' element={<Admin />} />



            <Route path='/main' element={<Layout />} >


              <Route exact index element={<Main />} />
              <Route path='profile' element={<PrivateRoute element={Profile} />} />
              <Route path='fav' element={<PrivateRoute element={Favorite} />} />
              <Route path='command' element={<PrivateRoute element={Command} />} />

              <Route path='error' element={<Outlet />}>
                <Route path='forgotPassword' index element={<ForgotPassword />} />
                <Route path='resendEmail' element={<ResendEmail />} />
              </Route>

              <Route path='cart' element={<Outlet />} >
                <Route index exact element={<PrivateRoute element={Cart} />} />
                <Route path='checkout' element={<PrivateRoute element={Checkout} />} />
              </Route>


              <Route path='cloth' element={<SecondLayout />} >
                <Route path=':id' exact element={<Clothing />} />
              </Route>

              <Route path='help' element={<Help />} />

              <Route path='admin' element={<Outlet />} >
                <Route index element={<AdminRoute element={Admin} />} />
                <Route path='commands' element={<AdminRoute element={AdminCommands} />} />
                <Route path='discount' element={<AdminRoute element={AdminDiscount} />} />
                <Route path='errors' element={<AdminRoute element={AdminErrors} />} />
              </Route>


            </Route>


            <Route path='product' exact element={<Layout />} >
              <Route path=":idPath" exact element={<SpecialProduct />} />
            </Route>


            <Route path='*' index element={<><Navbar /><NotFound /><Footer /></>} />
          </Routes>
        </DefaultProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
