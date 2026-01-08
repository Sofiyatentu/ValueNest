import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthLayout from './components/auth/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import AdminLayout from './components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminOrders from './pages/admin/orders';
import AdminProducts from './pages/admin/products';
import ShoppingLayout from './components/shopping/shoppingLayout';
import NotFound from './pages/NotFound';
import Homepage from './pages/shopping/Home';
import Account from './pages/shopping/account';
import Checkout from './pages/shopping/checkout';
import Listing from './pages/shopping/listing';
import CheckAuth from './components/CheckAuth';
import UnAuthPage from './pages/UnAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';
import PayPalReturn from './pages/shopping/paypalReturn';
import PaymentSuccess from './pages/shopping/paymentSuccess';
import SearchPage from './pages/shopping/search';

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const a = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    dispatch(checkAuth(token));
  }, [dispatch]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <AuthLayout />
            </CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Homepage />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="list" element={<Listing />} />
          <Route path="paypal-return" element={<PayPalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
        <Route path="/unauth" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
