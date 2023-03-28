import '../index.css';
import './Main/css/navbar.css'
import './Main/css/footer.css'
import './Main/css/sidebar.css'
import './Main/css/profile.css'
import './Main/css/clothing.css'
import './Main/css/specialProduct.css'
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import DefaultProvider from '../contexts/DefaultContext';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './Main/Layout/Navbar';
import Footer from './Main/Layout/Footer';
import Sidebar from './Main/Layout/Sidebar';

import Connect from './Connect';
import Main from './Main/Main';
import Profile from './Main/Profile'
import Favorite from './Main/Favorite'
import Cart from './Main/Cart';

import SpecialProduct from './Main/Layout/SpecialProduct';
import Clothing from './Main/Layout/Clothing'
import PrivateRoute from './PrivateRoute';

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
const NotFound = () => (
  <>Pagina in lucru, sau link gresit.</>
)
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
          <Routes>
            <Route path='/' index element={<GoTo />} />
            <Route path='/connect' element={<Connect />} />
            <Route path='/main' element={<Layout />} >
              <Route exact index element={<Main />} />
              <Route path='profile' element={<PrivateRoute element={Profile} />} />
              <Route path='fav' element={<PrivateRoute element={Favorite} />} />
              <Route path='cart' element={<PrivateRoute element={Cart} /> } />
              <Route path='cloth' element={<SecondLayout /> } >
                <Route path=':id' exact element={<Clothing /> } />
              </Route>
            </Route>
            <Route path='product' exact element={<Layout />} >
              <Route path=":idPath" exact element={<SpecialProduct />} />
            </Route>
            <Route path='*' index element={<NotFound />} />
          </Routes>
        </DefaultProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}
export default App;
