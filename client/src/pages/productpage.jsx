import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import '../styles/productList.css';
import { useNavigate } from 'react-router-dom';
import mockProducts from '../data/mockProducts';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(product => product.name.toLowerCase().includes(lowercasedTerm));
    }
    setFilteredProducts(result);
  }, [searchTerm, activeCategory, products]);

  const handleAddToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const handleBuyNow = (product) => {
    navigate('/payment', { state: { item: product } });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="product-container">
      <h2 className="product-title">T-Shirt Collection</h2>
      <div className="product-card">
        <h3>Shopping Cart ({cart.length} items)</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}
              <button onClick={() => handleRemoveFromCart(index)} className='remove'>Remove</button>
            </li>
          ))}
        </ul>
        <h4>Total Price: ${totalPrice}</h4>
        {cart.length > 0 && <button className="buy-now" onClick={() => handleBuyNow(cart)}>Buy Now</button>}
      </div>
       
      <div className="search-filter-container">
        
        <input type="search" placeholder="Search t-shirts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="searchinput" />
        <Search className="searchBox" />
      </div>
      <div className="categoryfilters">
        <button className={`category-btn ${activeCategory === 'all' ? 'category-btn-active' : ''}`} onClick={() => handleCategoryChange('all')}>All</button>
        <button className={`category-btn ${activeCategory === 'men' ? 'category-btn-active' : ''}`} onClick={() => handleCategoryChange('men')}>Men</button>
        <button className={`category-btn ${activeCategory === 'women' ? 'category-btn-active' : ''}`} onClick={() => handleCategoryChange('women')}>Women</button>
        <button className={`category-btn ${activeCategory === 'children' ? 'category-btn-active' : ''}`} onClick={() => handleCategoryChange('children')}>Children</button>
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button 
                className={`product-btn ${!product.inStock ? 'product-btn-disabled' : ''}`}
                disabled={!product.inStock}
                onClick={() => handleAddToCart(product)}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="product-btn" onClick={() => handleBuyNow(product)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

