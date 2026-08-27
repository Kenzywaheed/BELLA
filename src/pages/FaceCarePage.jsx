import React, { useState, useMemo } from 'react';
import { faceCareProducts } from '../data/faceCareProducts';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Face Cream', 'Face Serum', 'Face Wash', 'Face Mask', 'Eye Cream', 'Eye Patches'];
const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Newest'];

function FaceCarePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    let products = [...faceCareProducts];

    // Filter by category
    if (activeCategory !== 'All') {
      products = products.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.description.toLowerCase().includes(lowerSearch) ||
        p.category.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    switch (sortBy) {
      case 'Price: Low to High':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'Highest Rated':
        products.sort((a, b) => b.rating - a.rating);
        break;
      // 'Featured' and 'Newest' can just use default array order or mock logic
      default:
        break;
    }

    return products;
  }, [activeCategory, searchTerm, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="face-care-page page-transition">
      <div className="page-hero">
        <h1 className="page-title">FACE CARE</h1>
        <p className="page-subtitle">Rituals created to nourish, hydrate, and reveal your natural glow.</p>
      </div>

      <div className="category-nav-wrapper">
        <nav className="category-nav">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      <div className="shop-controls">
        <div className="search-box">
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, marginTop: '2px' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search face care..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="sort-box">
          <label>Sort by:</label>
          <select value={sortBy} onChange={handleSortChange}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-grid">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="page-btn" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default FaceCarePage;
