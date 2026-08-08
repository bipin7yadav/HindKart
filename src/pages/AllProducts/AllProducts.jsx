import React, { useState, useEffect } from "react";
import "./AllProducts.css";
import { Link, useNavigate } from "react-router-dom";
import { useProductListContext } from "../../contexts/ProductContext";
import { toast } from "react-toastify";
import { MdStar, MdFavorite, MdFavoriteBorder, MdShoppingBag, MdClear, MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const categoryList = [
  { name: "Men", label: "Men's Wear" },
  { name: "Women", label: "Women's Wear" },
  { name: "Kids", label: "Kids' Collection" },
  { name: "Home & Living", label: "Home & Living" },
  { name: "Shorts", label: "Shorts" },
  { name: "T-shirt", label: "T-Shirts" },
  { name: "Shirt", label: "Shirts & Jackets" },
  { name: "Shoes", label: "Footwear & Shoes" },
  { name: "Trousers", label: "Jeans & Trousers" },
];

const brandList = [
  "HRX by Hrithik Roshan",
  "Puma",
  "Nike",
  "H&M",
  "Roadster",
  "Nautica",
  "Bene Kleed",
  "Highlander",
  "Tommy Hilfiger",
  "Rare Rabbit",
  "IVOC",
  "Artengo By Decathlon",
  "Anouk",
  "Portico New York",
  "Home Centre",
  "Spaces",
];

const ITEMS_PER_PAGE = 12;

function AllProducts() {
  const {
    product,
    loading,
    filterState,
    dispatchFilter,
    dispatchCart,
    dispatchWish,
    cartState: { cart },
    wishState: { wish },
  } = useProductListContext();

  const { bySort, byStock, byFastDelivery, category, brand, byRating, bySearch, byRange } = filterState;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever any filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [bySort, byStock, byFastDelivery, category, brand, byRating, bySearch, byRange]);

  const getFilteredProducts = () => {
    let list = [...product];

    if (bySearch) {
      const searchLower = bySearch.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(searchLower)) ||
          (p.gender && p.gender.toLowerCase().includes(searchLower))
      );
    }

    if (category && category.length > 0) {
      list = list.filter((p) =>
        category.some((c) => {
          const cLower = c.toLowerCase();
          const catMatch = p.categoryName && p.categoryName.toLowerCase() === cLower;
          const genderMatch = p.gender && p.gender.toLowerCase() === cLower;
          return catMatch || genderMatch;
        })
      );
    }

    if (brand && brand.length > 0) {
      list = list.filter((p) =>
        brand.some((b) => p.brand.toLowerCase().includes(b.toLowerCase()))
      );
    }

    if (byStock) {
      list = list.filter((p) => p.inStock);
    }

    if (byFastDelivery) {
      list = list.filter((p) => p.fastDelivery);
    }

    if (byRating) {
      list = list.filter((p) => p.rating >= byRating);
    }

    if (byRange) {
      list = list.filter((p) => p.price <= byRange);
    }

    if (bySort === "lowToHigh") {
      list.sort((a, b) => a.price - b.price);
    } else if (bySort === "highToLow") {
      list.sort((a, b) => b.price - a.price);
    } else if (bySort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (bySort === "discount") {
      list.sort((a, b) => parseInt(b.discount || 0) - parseInt(a.discount || 0));
    }

    return list;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="plp-page">
      {/* Breadcrumb Bar */}
      <div className="breadcrumb-bar">
        <Link to="/">Home</Link> / <span>Catalog</span> / <strong>All Products</strong>
      </div>

      {/* Toolbar Header */}
      <div className="plp-header-bar">
        <div className="plp-title-group">
          <h2 className="plp-main-title">FILTERS & PRODUCTS</h2>
          <span className="plp-item-count">- {filteredProducts.length} items</span>
        </div>

        <div className="plp-sort-group">
          <label className="sort-label">Sort by :</label>
          <select
            className="sort-select"
            value={bySort || "recommended"}
            onChange={(e) =>
              dispatchFilter({
                type: "SORT",
                payload: e.target.value === "recommended" ? null : e.target.value,
              })
            }
          >
            <option value="recommended">Recommended</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="discount">Better Discount</option>
          </select>
        </div>
      </div>

      <div className="plp-main-layout">
        {/* Left Sidebar Filters */}
        <aside className="plp-sidebar">
          <div className="sidebar-header">
            <h3>FILTERS</h3>
            {(category.length > 0 || brand.length > 0 || byStock || byFastDelivery || byRating > 0 || bySort || bySearch) && (
              <button
                className="clear-all-btn"
                onClick={() => dispatchFilter({ type: "CLEAR" })}
              >
                CLEAR ALL
              </button>
            )}
          </div>

          {/* Search Active Filter Tag */}
          {bySearch && (
            <div className="active-filter-pill" onClick={() => dispatchFilter({ type: "SEARCH", payload: "" })}>
              Search: "{bySearch}" <MdClear />
            </div>
          )}

          {/* Category Filter */}
          <div className="filter-section">
            <h4 className="filter-title">CATEGORIES</h4>
            <div className="filter-options">
              {categoryList.map((cat) => (
                <label key={cat.name} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={category.includes(cat.name)}
                    onChange={() =>
                      dispatchFilter({
                        type: "CATEGORY",
                        payload: cat.name,
                      })
                    }
                  />
                  <span className="option-text">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="filter-section">
            <h4 className="filter-title">BRAND</h4>
            <div className="filter-options brand-scroll">
              {brandList.map((b) => (
                <label key={b} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={brand.includes(b)}
                    onChange={() =>
                      dispatchFilter({
                        type: "BRAND",
                        payload: b,
                      })
                    }
                  />
                  <span className="option-text">{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4 className="filter-title">PRICE RANGE</h4>
            <div className="price-slider-info">
              <span>Up to ₹{byRange || 6000}</span>
            </div>
            <input
              type="range"
              min="300"
              max="6000"
              step="100"
              value={byRange || 6000}
              className="price-range-slider"
              onChange={(e) =>
                dispatchFilter({
                  type: "RANGE",
                  payload: Number(e.target.value),
                })
              }
            />
            <div className="slider-labels">
              <span>₹300</span>
              <span>₹6000</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <h4 className="filter-title">CUSTOMER RATING</h4>
            <div className="filter-options">
              {[4, 3, 2, 1].map((r) => (
                <label key={r} className="filter-radio-label">
                  <input
                    type="radio"
                    name="rating-filter"
                    checked={byRating === r}
                    onChange={() =>
                      dispatchFilter({
                        type: "RATING",
                        payload: r,
                      })
                    }
                  />
                  <span className="option-text">{r}★ & above</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="filter-section">
            <h4 className="filter-title">AVAILABILITY</h4>
            <div className="filter-options">
              <label className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={byStock}
                  onChange={() => dispatchFilter({ type: "STOCK" })}
                />
                <span className="option-text">Include In-Stock Only</span>
              </label>

              <label className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={byFastDelivery}
                  onChange={() => dispatchFilter({ type: "DELIVERY" })}
                />
                <span className="option-text">Fast Express Delivery</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Cards Grid Section */}
        <main className="plp-products-container">
          {loading ? (
            <div className="plp-loading">Loading catalog products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="plp-no-results">
              <h3>We couldn't find any matches!</h3>
              <p>Try clearing your filters or searching for different brands.</p>
              <button
                className="btn btn-primary"
                onClick={() => dispatchFilter({ type: "CLEAR" })}
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <>
              <div className="plp-grid">
                {paginatedProducts.map((prod) => {
                  const isWishlisted = wish.some((i) => i._id === prod._id);
                  const isCarted = cart.some((i) => i._id === prod._id);

                  return (
                    <div className="myntra-card" key={prod._id}>
                      <div className="card-image-wrapper">
                        <Link to="/SingleProduct" state={{ product: prod }}>
                          <img src={prod.image} alt={prod.title} className="card-img" />
                        </Link>

                        {/* Rating Overlay */}
                        <div className="rating-pill-overlay">
                          <span>{prod.rating}</span>
                          <MdStar className="star-icon" />
                          <span className="rating-divider">|</span>
                          <span className="review-count">1.2k</span>
                        </div>

                        {/* Wishlist Toggle Button */}
                        <button
                          className={`wishlist-heart-btn ${isWishlisted ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            dispatchWish({ type: "TOGGLE_WISHLIST", payload: prod });
                            toast.success(
                              isWishlisted ? "Removed from Wishlist" : "Added to Wishlist"
                            );
                          }}
                        >
                          {isWishlisted ? <MdFavorite className="heart-pink" /> : <MdFavoriteBorder />}
                        </button>
                      </div>

                      <Link to="/SingleProduct" state={{ product: prod }} className="card-details-link">
                        <div className="card-body">
                          <h4 className="card-brand">{prod.brand}</h4>
                          <p className="card-title" title={prod.title}>
                            {prod.title}
                          </p>
                          <div className="card-price-row">
                            <span className="current-price">₹{prod.price}</span>
                            <span className="original-price">₹{prod.originalPrice}</span>
                            <span className="discount-percent">({prod.discount}% OFF)</span>
                          </div>
                        </div>
                      </Link>

                      <div className="card-hover-action">
                        {isCarted ? (
                          <button
                            className="card-cta-btn carted"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              navigate("/MyCart");
                            }}
                          >
                            GO TO BAG
                          </button>
                        ) : (
                          <button
                            className="card-cta-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              dispatchCart({ type: "ADD_TO_CART", payload: prod });
                              toast.success("Added to Bag!");
                            }}
                            disabled={!prod.inStock}
                          >
                            <MdShoppingBag /> {prod.inStock ? "ADD TO BAG" : "OUT OF STOCK"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Bar */}
              {totalPages > 1 && (
                <div className="pagination-bar">
                  <button
                    className="pagination-btn icon-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <MdNavigateBefore /> PREV
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`page-num-btn ${pageNum === currentPage ? "active" : ""}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    className="pagination-btn icon-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    NEXT <MdNavigateNext />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export { AllProducts };