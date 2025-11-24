import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Weather from './components/Weather';
import Products from './components/product/Products';
import ProductDetails from './components/product/ProductDetails';
import ProductCreate from './components/product/ProductCreate';
import ProductUpdate from './components/product/ProductUpdate';
import RequireAuth from './components/RequireAuth';
import { BrowserRouter, Link, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
        <Link to="/login">Login</Link> | <Link to="/weather">Weather</Link> |{' '}
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/weather"
          element={
            <RequireAuth>
              <Weather />
            </RequireAuth>
          }
        />
        <Route path="/product/create" element={<ProductCreate />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/product/update/:productId" element={<ProductUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
