import React, { useState } from "react";
import "./SingleProduct.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useProductListContext } from "../../contexts/ProductContext";
import { toast } from "react-toastify";
import {
  MdStar,
  MdFavorite,
  MdFavoriteBorder,
  MdShoppingBag,
  MdLocalShipping,
  MdOutlineAssignmentReturn,
  MdVerified,
  MdCheckCircle,
} from "react-icons/md";

function SingleProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product: allProducts, cartState: { cart }, dispatchCart, wishState: { wish }, dispatchWish } = useProductListContext();

  // Pick product from router state or fallback to first product
  const currentProduct = location.state?.product || allProducts[0] || {
    _id: "default-1",
    title: "HRX Dry Fit Shorts Men",
    brand: "HRX by Hrithik Roshan",
    categoryName: "Shorts",
    image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11641064/2020/9/9/ac522d33-1325-4e3e-ab68-1de4768a61b11599633085687-HRX-by-Hrithik-Roshan-Men-Medieval-Blue-Solid-Regular-Fit-Ra-1.jpg",
    price: 479,
    originalPrice: 1099,
    discount: "56",
    rating: 4.3,
    inStock: true,
    fastDelivery: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
  };

  const [selectedSize, setSelectedSize] = useState("M");
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const isCarted = cart.some((i) => i._id === currentProduct._id);
  const isWishlisted = wish.some((i) => i._id === currentProduct._id);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && !isNaN(pincode)) {
      setPincodeChecked(true);
      toast.success("Delivery available to pincode " + pincode);
    } else {
      toast.error("Please enter a valid 6-digit pincode");
    }
  };

  return (
    <div className="pdp-page">
      {/* Breadcrumbs */}
      <div className="pdp-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/AllProducts">Products</Link> /{" "}
        <span>{currentProduct.categoryName}</span> / <strong>{currentProduct.brand}</strong>
      </div>

      <div className="pdp-container">
        {/* Left Side: Product Gallery */}
        <div className="pdp-gallery">
          <div className="main-image-box">
            <img src={currentProduct.image} alt={currentProduct.title} className="pdp-main-img" />
            <button
              className={`pdp-wishlist-badge ${isWishlisted ? "active" : ""}`}
              onClick={() => {
                dispatchWish({ type: "TOGGLE_WISHLIST", payload: currentProduct });
                toast.success(isWishlisted ? "Removed from Wishlist" : "Saved to Wishlist");
              }}
            >
              {isWishlisted ? <MdFavorite className="heart-pink" /> : <MdFavoriteBorder />}
              <span>{isWishlisted ? "WISHLISTED" : "WISHLIST"}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Details & Purchasing */}
        <div className="pdp-details">
          <h1 className="pdp-brand">{currentProduct.brand}</h1>
          <h2 className="pdp-title">{currentProduct.title}</h2>

          {/* Rating Pill */}
          <div className="pdp-rating-pill">
            <span className="rating-score">{currentProduct.rating}</span>
            <MdStar className="star" />
            <span className="divider">|</span>
            <span className="rating-count">1.4k Ratings & 240 Reviews</span>
          </div>

          <div className="pdp-divider" />

          {/* Pricing */}
          <div className="pdp-price-box">
            <span className="pdp-current-price">₹{currentProduct.price}</span>
            <span className="pdp-mrp">MRP ₹{currentProduct.originalPrice || Math.round(currentProduct.price * 1.8)}</span>
            <span className="pdp-discount">({currentProduct.discount || "45"}% OFF)</span>
          </div>
          <p className="pdp-tax-label">inclusive of all taxes</p>

          {/* Select Size */}
          <div className="pdp-size-section">
            <div className="size-header">
              <h4>SELECT SIZE</h4>
              <span className="size-chart-link">SIZE CHART &gt;</span>
            </div>

            <div className="size-buttons">
              {(currentProduct.sizes || ["S", "M", "L", "XL", "XXL"]).map((sz) => (
                <button
                  key={sz}
                  className={`size-btn ${selectedSize === sz ? "selected" : ""}`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pdp-actions">
            {isCarted ? (
              <button className="pdp-btn btn-go-to-bag" onClick={() => navigate("/MyCart")}>
                <MdShoppingBag /> GO TO BAG
              </button>
            ) : (
              <button
                className="pdp-btn btn-add-bag"
                onClick={() => {
                  dispatchCart({
                    type: "ADD_TO_CART",
                    payload: { ...currentProduct, selectedSize },
                  });
                  toast.success("Added to Bag!");
                }}
                disabled={!currentProduct.inStock}
              >
                <MdShoppingBag /> {currentProduct.inStock ? "ADD TO BAG" : "OUT OF STOCK"}
              </button>
            )}

            <button
              className={`pdp-btn btn-wishlist ${isWishlisted ? "active" : ""}`}
              onClick={() => {
                dispatchWish({ type: "TOGGLE_WISHLIST", payload: currentProduct });
                toast.success(isWishlisted ? "Removed from Wishlist" : "Saved to Wishlist");
              }}
            >
              {isWishlisted ? <MdFavorite className="heart-pink" /> : <MdFavoriteBorder />}
              {isWishlisted ? "WISHLISTED" : "WISHLIST"}
            </button>
          </div>

          <div className="pdp-divider" />

          {/* Delivery Options */}
          <div className="pdp-delivery-section">
            <h4>
              DELIVERY OPTIONS <MdLocalShipping />
            </h4>
            <form onSubmit={handlePincodeCheck} className="pincode-form">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode"
                maxLength="6"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="pincode-input"
              />
              <button type="submit" className="pincode-check-btn">
                CHECK
              </button>
            </form>

            {pincodeChecked && (
              <div className="pincode-success">
                <MdCheckCircle className="check-icon" /> Delivery available to <strong>{pincode}</strong> by tomorrow!
              </div>
            )}

            <ul className="delivery-features">
              <li>
                <MdLocalShipping className="feat-icon" /> 100% Original Products
              </li>
              <li>
                <MdOutlineAssignmentReturn className="feat-icon" /> Pay on delivery available
              </li>
              <li>
                <MdVerified className="feat-icon" /> Easy 14 days returns & exchanges
              </li>
            </ul>
          </div>

          <div className="pdp-divider" />

          {/* Product Specifications */}
          <div className="pdp-specs-section">
            <h4>PRODUCT DETAILS</h4>
            <p className="specs-desc">
              Upgrade your wardrobe with this stylish {currentProduct.title} from {currentProduct.brand}. Crafted with premium high-grade fabric for ultimate comfort and breathability throughout the day.
            </p>

            <h5 className="specs-subtitle">SPECIFICATIONS</h5>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-name">Fabric</span>
                <span className="spec-val">Pure Cotton / Polyester Blend</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Fit</span>
                <span className="spec-val">Regular Fit</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Pattern</span>
                <span className="spec-val">Solid / Printed</span>
              </div>
              <div className="spec-item">
                <span className="spec-name">Wash Care</span>
                <span className="spec-val">Machine Washable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SingleProduct };