import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useProductListContext } from "../../contexts/ProductContext";
import { toast } from "react-toastify";
import { MdOutlineArrowForward, MdFavorite, MdFavoriteBorder, MdStar, MdShoppingBag } from "react-icons/md";

const heroBanners = [
  {
    id: 1,
    title: "BIG FASHION FESTIVAL",
    subtitle: "50% - 80% OFF ON TOP BRANDS",
    cta: "EXPLORE NOW",
    bgGradient: "linear-gradient(135deg, #1e0034 0%, #ff3f6c 100%)",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    tag: "LIMITED TIME OFFER",
  },
  {
    id: 2,
    title: "NEW SEASON ARRIVALS",
    subtitle: "UPTO 60% OFF ON TRENDING APPAREL",
    cta: "SHOP COLLECTION",
    bgGradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    tag: "STREETWEAR & CASUALS",
  },
  {
    id: 3,
    title: "PREMIUM FOOTWEAR & ATHLEISURE",
    subtitle: "NIKE, PUMA, HRX & MORE",
    cta: "DISCOVER SHOES",
    bgGradient: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80",
    tag: "EXTRA 15% OFF ON HINDKART APP",
  },
];

const topBrands = [
  { name: "HRX", logo: "HRX BY HRITHIK ROSHAN", offer: "Min. 50% Off", color: "#e11d48" },
  { name: "PUMA", logo: "PUMA SPORTS", offer: "40-70% Off", color: "#2563eb" },
  { name: "NIKE", logo: "NIKE ATHLETICS", offer: "Up to 50% Off", color: "#111827" },
  { name: "H&M", logo: "H&M CASUALS", offer: "Starting ₹399", color: "#dc2626" },
  { name: "ROADSTER", logo: "ROADSTER LIFE CO.", offer: "Flat 60% Off", color: "#d97706" },
  { name: "NAUTICA", logo: "NAUTICA PREMIUM", offer: "Min. 40% Off", color: "#0284c7" },
];

function Home() {
  const { category, dispatchFilter, product, wishState: { wish }, dispatchWish, cartState: { cart }, dispatchCart } = useProductListContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (catPayload) => {
    dispatchFilter({ type: "CLEAR" });
    dispatchFilter({ type: "CATEGORY", payload: catPayload });
    navigate("/AllProducts");
  };

  const trendingProducts = product.slice(0, 8);

  return (
    <div className="home-page">
      {/* Hero Banner Carousel */}
      <section className="hero-slider">
        {heroBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${banner.image})` }}
          >
            <div className="slide-content">
              <span className="slide-tag">{banner.tag}</span>
              <h1 className="slide-title">{banner.title}</h1>
              <p className="slide-subtitle">{banner.subtitle}</p>
              <Link to="/AllProducts" className="slide-cta">
                {banner.cta} <MdOutlineArrowForward />
              </Link>
            </div>
          </div>
        ))}

        <div className="slider-dots">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Offer Coupons Bar */}
      <div className="offer-strip">
        <div className="strip-text">
          ⚡ FLAT <strong>₹300 OFF</strong> + FREE SHIPPING ON YOUR FIRST ORDER! USE CODE: <strong>HINDKART300</strong>
        </div>
      </div>

      {/* Shop By Category Section */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">CATEGORIES TO BAG</h2>
          <div className="section-underline" />
        </div>

        <div className="category-grid">
          {category.map((item) => {
            const { _id, img, categoryName, payload } = item;
            return (
              <div
                key={_id}
                className="category-card"
                onClick={() => handleCategoryClick(payload)}
              >
                <div className="category-img-wrapper">
                  <img src={img} alt={categoryName} className="category-img" />
                  <div className="category-overlay">
                    <span className="category-badge">EXPLORE</span>
                  </div>
                </div>
                <div className="category-info">
                  <h4 className="category-name">{categoryName}</h4>
                  <span className="category-offer">UPTO 70% OFF</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grand Global Brands */}
      <section className="home-section bg-tint">
        <div className="section-header">
          <h2 className="section-title">GRAND GLOBAL BRANDS</h2>
          <p className="section-sub">Explore top international & premium apparel brands</p>
          <div className="section-underline" />
        </div>

        <div className="brands-grid">
          {topBrands.map((brand, idx) => (
            <div
              key={idx}
              className="brand-card"
              onClick={() => {
                dispatchFilter({ type: "CLEAR" });
                dispatchFilter({ type: "BRAND", payload: brand.name });
                navigate("/AllProducts");
              }}
            >
              <div className="brand-header" style={{ backgroundColor: brand.color }}>
                {brand.name}
              </div>
              <div className="brand-body">
                <h5>{brand.logo}</h5>
                <p className="brand-offer">{brand.offer}</p>
                <span className="shop-brand-link">Shop Now &gt;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">TRENDING IN FASHION</h2>
          <div className="section-underline" />
        </div>

        <div className="products-grid">
          {trendingProducts.map((prod) => {
            const isWishlisted = wish.some((i) => i._id === prod._id);
            const isCarted = cart.some((i) => i._id === prod._id);

            return (
              <div className="myntra-card" key={prod._id}>
                <div className="card-image-wrapper">
                  <Link to="/SingleProduct" state={{ product: prod }}>
                    <img src={prod.image} alt={prod.title} className="card-img" />
                  </Link>

                  {/* Rating Pill */}
                  <div className="rating-pill-overlay">
                    <span>{prod.rating}</span>
                    <MdStar className="star-icon" />
                    <span className="rating-divider">|</span>
                    <span className="review-count">1.2k</span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    className={`wishlist-heart-btn ${isWishlisted ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatchWish({ type: "TOGGLE_WISHLIST", payload: prod });
                      toast.success(isWishlisted ? "Removed from Wishlist" : "Saved to Wishlist");
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

        <div className="view-all-wrapper">
          <Link to="/AllProducts" className="view-all-btn">
            VIEW ALL PRODUCTS <MdOutlineArrowForward />
          </Link>
        </div>
      </section>
    </div>
  );
}

export { Home };