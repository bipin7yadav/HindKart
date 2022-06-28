import "./Navigation.css";
import {Link} from "react-router-dom";
import {useProductListContext} from "../../contexts/ProductContext"
import { MdAccountCircle , MdFavorite } from "react-icons/md";
import { ImCart } from "react-icons/im";


function Navigation(){

    const {dispatchFilter,cartState:{cart},wishState:{wish}}=useProductListContext()
    return<>

    <div className="header">
        <div className="">
            <Link to="/"><h3 className="WebName"> 🅷🅸🅽🅳🅺🅰🆁🆃 </h3></Link>
        </div>
        <div className="searchbar" >
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
            <Link to="/SignUp"><h2><MdAccountCircle className="icons"/></h2></Link>
            <Link to="/Wishlist" className="Rel"><h2 ><MdFavorite className="icons"/></h2> {wish.length>0?<span className="badge">{wish.length}</span>:<span></span>}</Link>
            <Link to="/MyCart" className="Rel"><h2><ImCart className="icons"/>{cart.length>0?<span className="badge">{cart.length}</span>:<span></span>}</h2></Link>
        
        </div>
    </div>
    </>
}

export {Navigation}
