import "./Signup.css"
import { Link } from "react-router-dom"
function SignUp() {
    return (
        <>
            <div className="signup">
                <div className="info">
                    <div class="SignUP">
                        <h2 id="sign-up">sign-up</h2>

                    </div >

                    <div><label for="name">First Name*</label><br />
                        <input type="text" className="signup-input" placeholder="Bipin" /><br /></div>

                    <div><label for="name">Last Name*</label><br />
                        <input type="text" className="signup-input" placeholder="Yadav" /><br /></div>

                    <div><label for="name">Email Address*</label><br />
                        <input type="text" className="signup-input" placeholder="bipinyadav9769@gmail.com" /><br /></div>

                    <div><label for="name">Password*</label><br />
                        <input type="password" className="signup-input" placeholder="*************" /><br /></div>

                    <div><label for="name">Confirm Password*</label><br />
                        <input type="password" className="signup-input" placeholder="*************" /><br /></div>

                    <div><div >I accept all Terms & Conditions</div></div>

                    <button  className="btn-login"><a href="/Login">Create New Account</a></button>

                    <div >Already have an account </div>
                    <Link to="/Login"><button className="btn-login">Login</button></Link>

                    <div className="sign-up">




                    </div>

                </div>
            </div>
        </>
    )
}

export { SignUp }