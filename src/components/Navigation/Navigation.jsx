import React, { useState } from "react";
import "./Navigation.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProductListContext } from "../../contexts/ProductContext";
import { useAuth } from "../../contexts/AuthContext";
import { MdSearch, MdOutlinePersonOutline, MdFavoriteBorder, MdOutlineShoppingBag, MdLogout } from "react-icons/md";

function Navigation() {
  const {
    filterState: { bySearch },
    dispatchFilter,
    cartState: { cart },
    wishState: { wish },
  } = useProductListContext();

  const { state: { userInfo, isLoggedIn }, logoutHandler } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Safely resolve user name
  const getUserName = () => {
    if (!isLoggedIn || !userInfo) return null;
    return userInfo.firstName || userInfo.user?.firstName || "User";
  };

  const userName = getUserName();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatchFilter({
      type: "SEARCH",
      payload: value,
    });
    if (pathname !== "/AllProducts") {
      navigate("/AllProducts");
    }
  };

  const handleCategoryClick = (catName) => {
    if (catName === "ALL") {
      dispatchFilter({ type: "CLEAR" });
    } else {
      dispatchFilter({ type: "CLEAR" });
      dispatchFilter({ type: "CATEGORY", payload: catName });
    }
    navigate("/AllProducts");
  };

  return (
    <header className="myntra-header">
      <div className="header-container">
        {/* Left Section: Logo & Nav Links */}
        <div className="left-section">
          <Link to="/" className="brand-logo" onClick={() => dispatchFilter({ type: "CLEAR" })}>
            <div className="logo-badge">H</div>
            <div className="brand-name">
              HINDKART<span className="logo-accent">.</span>
            </div>
          </Link>

          <nav className="nav-categories">
            <button className="nav-item" onClick={() => handleCategoryClick("T-shirt")}>
              MEN
            </button>
            <button className="nav-item" onClick={() => handleCategoryClick("Shirt")}>
              WOMEN
            </button>
            <button className="nav-item" onClick={() => handleCategoryClick("Shorts")}>
              KIDS
            </button>
            <button className="nav-item" onClick={() => handleCategoryClick("Trousers")}>
              HOME & LIVING
            </button>
            <button className="nav-item" onClick={() => handleCategoryClick("Shoes")}>
              FOOTWEAR
            </button>
            <button className="nav-item nav-highlight" onClick={() => handleCategoryClick("ALL")}>
              ALL PRODUCTS
            </button>
          </nav>
        </div>

        {/* Center Section: Search Bar */}
        <div className="center-section">
          <div className="myntra-search-bar">
            <MdSearch className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Search for products, brands and more"
              value={bySearch}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Right Section: Action Icons */}
        <div className="right-section">
          <div
            className="header-action-item profile-wrapper"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <MdOutlinePersonOutline className="action-icon" />
            <span className="action-label">
              {userName ? `Hi, ${userName}` : "Profile"}
            </span>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <p className="welcome-title">
                    {userName ? `Welcome, ${userName}!` : "Welcome to HindKart"}
                  </p>
                  <p className="welcome-subtitle">To access account and manage orders</p>
                  {!isLoggedIn ? (
                    <Link to="/Login" className="login-signup-btn">
                      LOGIN / SIGNUP
                    </Link>
                  ) : (
                    <Link to="/Profile" className="login-signup-btn view-profile-btn">
                      VIEW PROFILE
                    </Link>
                  )}
                </div>
                <div className="dropdown-divider" />
                <ul className="dropdown-links">
                  <li>
                    <Link to="/MyCart">Orders & Bag</Link>
                  </li>
                  <li>
                    <Link to="/Wishlist">Wishlist</Link>
                  </li>
                  {isLoggedIn && (
                    <li>
                      <button onClick={logoutHandler} className="logout-btn">
                        <MdLogout /> Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <Link to="/Wishlist" className="header-action-item">
            <div className="icon-badge-wrapper">
              <MdFavoriteBorder className="action-icon" />
              {wish.length > 0 && <span className="header-badge">{wish.length}</span>}
            </div>
            <span className="action-label">Wishlist</span>
          </Link>

          <Link to="/MyCart" className="header-action-item">
            <div className="icon-badge-wrapper">
              <MdOutlineShoppingBag className="action-icon" />
              {cart.length > 0 && <span className="header-badge pink-badge">{cart.length}</span>}
            </div>
            <span className="action-label">Bag</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export { Navigation };
