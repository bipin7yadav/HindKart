import { useState } from "react"
import { useProductListContext } from "../../contexts/ProductContext"
import "./wishlist.css"

function Wishlist() {

    const { wishState: { wish },cartState:{cart},dispatchCart,dispatchWish } = useProductListContext()
    console.log(wish, "wish")

    const [wishItem,setWishItem]=useState(wish)

    function deleteWishItem(id){
        const updatedWishlist =wish.filter((a,index)=>index !== id)

        dispatchWish({
            type:"MOVE_TO_CART",
            payload:updatedWishlist
        })
        setWishItem(updatedWishlist)

        console.log(updatedWishlist,"updatrd")
    }

    return (<>
        <div className="wishlist"><h1>Items In  Wishlist: {wish.length} </h1></div>
        {
            wishItem.map((product,index) => {
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
                                <button className="btn"
                                    onClick={() => {
                                        // deleteWishItem(index)
                                        const checkCart=cart.some(item=>item._id ===product._id)
                                        if(!checkCart){
                                            dispatchCart({
                                                type: "ADD_TO_CART",
                                                payload: product
                                            })
                                            deleteWishItem(index)
                                        }
                                        // dispatchCart({
                                        //     type: "ADD_TO_CART",
                                        //     payload: product
                                        // })
                                        // deleteWishItem(index)
                                    }}
                                disabled={!inStock}
                                >Move To Cart</button>
                            </div>
                        </div>

                    </div>

                )
            })
        }
    </>)

}

export { Wishlist }