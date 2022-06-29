import "./Signup.css"
import { Link } from "react-router-dom"

function Login() {
    return (
        <>
            <div className="signup">
                <div className="info">
                    <div class="SignUP">
                        <h2 id="sign-up">Login</h2>

                    </div >

                    <div className="textbox">
                        <label for="name">Email Address*</label><br />
                        <input type="text" className="signup-input" placeholder="bipinyadav9769@gmail.com" /><br />
                    </div>

                    <div className="textbox">
                        <label for="name">Password*</label><br />
                        <input type="password" className="signup-input" placeholder="*************" /><br />
                        
                    </div>


                    <div  className="textbox2">
                        <input type="checkbox" ></input>
                        <div >Remember Me</div>
                    </div>

                    
                    <Link to="/" ><button className="btn-login">Login</button></Link>
                    <Link to=""><div>Forgot Password ?</div></Link>

                    <Link to="/SignUp" ><button className="btn-login">Sign Up</button></Link>

                    

                </div>
            </div>
        </>
    )
}

export { Login }