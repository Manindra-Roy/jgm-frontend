// src/pages/Home.jsx
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FCF9E8' }}>
            <Hero />
            <Brands />
            <ProductGrid />
        </div>
    );
}