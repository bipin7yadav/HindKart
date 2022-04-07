import "./Navigation.css";
import {Link} from "react-router-dom";
// import { Auth } from "./pages/index";
import {useProductListContext} from "../../contexts/ProductContext"


function Navigation(){

    const {dispatchFilter,cartState:{cart},wishState:{wish}}=useProductListContext()
    return<>

    <div className="header">
        <div className="btn">
            <Link to="/"><h3 className="WebName"> 🅷🅸🅽🅳🅺🅰🆁🆃 </h3></Link>
        </div>
        <div className="btn" >
            <input className="search" type="text" placeholder="Search..........."
            onChange={(e)=>{
                dispatchFilter({
                    type:"SEARCH",
                    payload:e.target.value
                })
            }}
            />
        </div>
        <div className="cartWish">
            <Link to="/SignUp" className="btn"><h2>👤 </h2></Link>
            <Link to="/Wishlist" className="btn Rel"><h2 >❤️</h2> {wish.length>0?<span className="badge">{wish.length}</span>:<span></span>}</Link>
            {/* {cart.length>0?<span className="badge">{cart.length}</span>:<span></span>} */}
            <Link to="/MyCart" className="btn Rel"><h2>🛒{cart.length>0?<span className="badge">{cart.length}</span>:<span></span>}</h2></Link>
        
        </div>
    </div>
    </>
}

export {Navigation}