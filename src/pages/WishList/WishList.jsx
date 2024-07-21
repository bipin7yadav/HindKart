import { useState } from "react"
import { toast } from "react-toastify"
import { useProductListContext } from "../../contexts/ProductContext"
import { Link } from "react-router-dom"
import "./wishlist.css"

function Wishlist() {

    const { wishState: { wish }, cartState: { cart }, dispatchCart, dispatchWish } = useProductListContext()
    console.log(wish, "wish")

    const [wishItem, setWishItem] = useState(wish)

    function deleteWishItem(id) {
        const updatedWishlist = wish.filter((a, index) => index !== id)

        dispatchWish({
            type: "MOVE_TO_CART",
            payload: updatedWishlist
        })
        setWishItem(updatedWishlist)

        console.log(updatedWishlist, "updatrd")
    }

    return (<>
        <div className="wishlist">

        {
            wishItem.length>0?
            wishItem.map((product, index) => {
                const { _id, title, price, brand, image, inStock, fastDelivery, rating } = product;
                return (

                    <div className="card" key={_id}>
                        <div className="pro-img">
                            <img src={image} className="imag"></img>
                        </div>
                        <div className="details">
                            <div>
                                <h5>{title}</h5>
                                <div>{brand}</div>
                                <div>Rating : {rating}</div>
                                <h6>Price :₹ {price}</h6>
                                {inStock ? <h6>Instock</h6> : <h6>Outoff Stock</h6>}
                                {fastDelivery ? <h6>FastDelivery</h6> : <h6>Minimum 3-4 Days</h6>}
                            </div>
                            <div className="btn-container">
                                <button className="btn1"
                                    onClick={() => {
                                        // deleteWishItem(index)
                                        const checkCart = cart.some(item => item._id === product._id)
                                        if (!checkCart) {
                                            toast.success("moved to cart")
                                            dispatchCart({
                                                type: "ADD_TO_CART",
                                                payload: product
                                            })
                                            deleteWishItem(index)
                                        } else {
                                            toast.info("allready in cart")
                                        }
                                    }}
                                    disabled={!inStock}
                                >Move To Cart</button>
                            </div>
                        </div>

                    </div>

                )
            }) : 
            <div className="wishlist-message-container">
                <h3>Wishlist Empty.</h3>
                <p>
                  Add items that you would like to save for later to your
                  wishlist
                </p>
                <Link className="btn btn-primary-outline" to="/AllProducts">
                  Add Items To Wishlist
                </Link>
              </div>
        }
        </div>
    </>)

}

export { Wishlist }