// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductsPage from './pages/ProductsPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Certification from './pages/Certification'; // Import the new page
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Add the Certification Route */}
              <Route path="/certification" element={<Certification />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          <Footer />
      </div>
    </Router>
  );
}

export default App;