import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useAuth } from "../../contexts/AuthContext";

export const Profile = () => {
  const {
    state: { userInfo, token, isLoggedIn },
    logoutHandler,
  } = useAuth();

  return (
    <main className="main-wrapper">
      <section className="profile-section">
        {token && isLoggedIn ? (
          <>
            <div className="profile-card">
              <p className="profile-top-title">Your Profile</p>
              <div className="info-section">
                <p className="user-info">
                  First Name: <span>{userInfo?.user?.firstName}</span>
                </p>
                <p className="user-info">
                  Last Name: <span>{userInfo?.user?.lastName}</span>
                </p>
                <p className="user-info">
                  Email address: <span>{userInfo?.user?.email}</span>
                </p>
                <button
                className="btn btn-primary login-btn"
                onClick={logoutHandler}
              >
                Log Out
              </button>
              </div>
            </div>
          </>
        ) : (
          <div className="user-message-container">
            <h3>You're logged out.</h3>
            <p>Log in to view your profile.</p>
            <Link className="btn btn-primary" to="/Login">
              Login
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};
