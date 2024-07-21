// import "./Signup.css"
// import { Link } from "react-router-dom"
// function SignUp() {
//     return (
//         <>
//             <div className="signup">
//                 <div className="info">
//                     <div class="SignUP">
//                         <h2 id="sign-up">sign-up</h2>

//                     </div >

//                     <div><label for="name">First Name*</label><br />
//                         <input type="text" className="signup-input" placeholder="Bipin" /><br /></div>

//                     <div><label for="name">Last Name*</label><br />
//                         <input type="text" className="signup-input" placeholder="Yadav" /><br /></div>

//                     <div><label for="name">Email Address*</label><br />
//                         <input type="text" className="signup-input" placeholder="bipinyadav9769@gmail.com" /><br /></div>

//                     <div><label for="name">Password*</label><br />
//                         <input type="password" className="signup-input" placeholder="*************" /><br /></div>

//                     <div><label for="name">Confirm Password*</label><br />
//                         <input type="password" className="signup-input" placeholder="*************" /><br /></div>

//                     <div><div >I accept all Terms & Conditions</div></div>

//                     <button  className="btn-login"><a href="/Login">Create New Account</a></button>

//                     <div >Already have an account </div>
//                     <Link to="/Login"><button className="btn-login">Login</button></Link>

//                     <div className="sign-up">




//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Profile } from "../Profile/Profile";
import "./Signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const {
    state: { error, token, isLoggedIn },
    signupHandler,
  } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const { firstName, lastName, email, password } = formData;
  const errorMsg = error !== "" ? error.data.errors[0] : "";

  const submitSignupFormData = () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      signupHandler(firstName, lastName, email, password);
    }
  };

  return (
    <main class="main-wrapper">
        {token && isLoggedIn?<Profile/>:
      <section class="signup-section signup-container">
          <div class="card signup-card-container">
          <div class="card-title">Signup</div>
          {errorMsg !== "" ? (
            <div className="signup-error-message">{errorMsg}</div>
          ) : null}
          <div class="card-body">
            <form onSubmit={e => e.preventDefault()}>
              <div class="input-group">
                <label class="input-label">Email address</label>
                <input
                  type="email"
                  class="input-field"
                  required
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div class="input-group">
                <label class="input-label">First Name</label>
                <input
                  type="text"
                  class="input-field"
                  required
                  value={formData.firstName}
                  onChange={e =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div class="input-group">
                <label class="input-label">Last Name</label>
                <input
                  type="text"
                  class="input-field"
                  required
                  value={formData.lastName}
                  onChange={e =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div class="input-group">
                <label class="input-label">Password</label>
                <input
                  type="password"
                  class="input-field"
                  required
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div
                class={`input-group ${
                  !isPasswordMatched ? "input-show-error" : null
                } `}
              >
                <label class="input-label">Confirm Password</label>
                <input
                  type="password"
                  class="input-field"
                  required
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    setIsPasswordMatched(password === e.target.value);
                  }}
                />
                {!isPasswordMatched && (
                  <div class="error-message">Password doesn't match.</div>
                )}
              </div>
              <div class="card-extra-content">
                <div class="checkbox-group">
                  <label class="checkbox-label" for="checkbox1">
                    <input
                      class="checkbox"
                      id="checkbox1"
                      type="checkbox"
                      name="checkbox"
                    />
                    I accept all Terms & Conditions
                  </label>
                </div>
              </div>
              <button
                class="btn btn-primary signup-btn"
                onClick={submitSignupFormData}
              >
                Create New Account
              </button>
            </form>
            <div class="create-new-account-link">
              <Link to="/Login">
                Already have an account
                <span class="material-icons">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
        }
    </main>
  );
};

export { SignUp }