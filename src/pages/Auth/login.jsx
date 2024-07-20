

// function Login() {
//     return (
//         <>
//             <div className="signup">
//                 <div className="info">
//                     <div class="SignUP">
//                         <h2 id="sign-up">Login</h2>

//                     </div >

//                     <div className="textbox">
//                         <label for="name">Email Address*</label><br />
//                         <input type="text" className="signup-input" placeholder="bipinyadav9769@gmail.com" /><br />
//                     </div>

//                     <div className="textbox">
//                         <label for="name">Password*</label><br />
//                         <input type="password" className="signup-input" placeholder="*************" /><br />
                        
//                     </div>


//                     <div  className="textbox2">
//                         <input type="checkbox" ></input>
//                         <div >Remember Me</div>
//                     </div>

                    
//                     <Link to="/" ><button className="btn-login">Login</button></Link>
//                     <Link to=""><div>Forgot Password ?</div></Link>

//                     <Link to="/SignUp" ><button className="btn-login">Sign Up</button></Link>

                    

//                 </div>
//             </div>
//         </>
//     )
// }

import React from "react";
import { useState } from "react";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    state: { error },
    loginHandler,
  } = useAuth();

  const errorMsg = error !== "" && error.data.errors[0];

  const submitLoginFormData = () => {
    loginHandler(email, password);
  };

  const submitLoginCredentials = () => {
    setEmail("john@gmail.com");
    setPassword("johndoe");
    loginHandler("john@gmail.com", "johndoe");
  };

  return (
    <main className="main-wrapper">
      <section className="login-section login-container">
        <div className="card login-card-container">
          <div className="card-title">Login</div>
          {errorMsg ? (
            <div className="login-error-message">{errorMsg}</div>
          ) : null}
          <div className="card-body">
            <form onSubmit={e => e.preventDefault()}>
              <div className="input-group">
                <label className="input-label">Email address</label>
                <input
                  type="email"
                  className="input-field"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="card-extra-content">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      className="checkbox"
                      id="checkbox1"
                      type="checkbox"
                      name="checkbox"
                    />
                    Remember me
                  </label>
                </div>
                <div className="forgot-password">Forgot your password?</div>
              </div>
              <button
                className="btn btn-primary login-btn"
                onClick={submitLoginFormData}
              >
                Login
              </button>
              <button
                className="btn btn-primary-outline login-btn mt-1"
                onClick={submitLoginCredentials}
              >
                Login with test credentials
              </button>
            </form>
            <div className="create-new-account-link">
              <Link to="/SignUp">
                Create New Account
                <span className="material-icons">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { Login }