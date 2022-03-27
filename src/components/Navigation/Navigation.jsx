import "./Navigation.css";
import {Link} from "react-router-dom";
// import { Auth } from "./pages/index";

function Navigation(){
    return<>

    <div className="header">
        <div className="btn">
            <Link to="/"><h3 className="WebNAme">HINDKART</h3></Link>
        </div>
        <div className="btn" >
            <input className="search" type="text" placeholder="Search..........."/>
        </div>
        <div className="cartWish">
            <Link to="/SignUp" className="btn"><h2>👤 </h2></Link>
            <Link to="/Wishlist" className="btn Rel"><h2 >❤️</h2> <span className="badge">3</span></Link>
            <Link to="/MyCart" className="btn Rel"><h2>🛒CART<span className="badge">2</span></h2></Link>
        
        </div>
    </div>
    </>
}

export {Navigation}