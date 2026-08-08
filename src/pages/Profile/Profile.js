import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useAuth } from "../../contexts/AuthContext";
import { MdShoppingBag, MdFavorite, MdLocationOn, MdLogout } from "react-icons/md";

export const Profile = () => {
  const {
    state: { userInfo, token, isLoggedIn },
    logoutHandler,
  } = useAuth();

  const user = userInfo?.user || userInfo || {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
  };

  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";
  const email = user?.email || "user@hindkart.com";

  return (
    <main className="profile-page-container">
      <section className="profile-card-section">
        {token && isLoggedIn ? (
          <div className="profile-card">
            <div className="profile-header-banner">
              <div className="avatar-circle">
                {firstName ? firstName[0].toUpperCase() : "U"}
              </div>
              <h3 className="profile-name">
                {firstName} {lastName}
              </h3>
              <p className="profile-email">{email}</p>
            </div>

            <div className="profile-menu">
              <Link to="/MyCart" className="menu-item">
                <MdShoppingBag className="menu-icon" /> My Orders & Bag
              </Link>
              <Link to="/Wishlist" className="menu-item">
                <MdFavorite className="menu-icon" /> My Wishlist
              </Link>
              <div className="menu-item">
                <MdLocationOn className="menu-icon" /> Saved Addresses
              </div>
            </div>

            <div className="profile-logout-box">
              <button className="logout-btn-full" onClick={logoutHandler}>
                <MdLogout /> LOG OUT
              </button>
            </div>
          </div>
        ) : (
          <div className="user-message-container">
            <h3>PLEASE LOG IN</h3>
            <p>Login to view your orders, wishlist, and account details.</p>
            <Link className="profile-login-btn" to="/Login">
              LOGIN / SIGNUP
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};
