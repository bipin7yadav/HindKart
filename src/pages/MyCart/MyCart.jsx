import { useState } from "react";

import { useProductListContext } from "../../contexts/ProductContext"
import "./cart.css"


function MyCart() {

    const { cartState: { cart },dispatchWish ,dispatchCart,wishState:{wish}} = useProductListContext()
    let totalPrice = 0;

    // const [item,setItem]=useState(cart)

    // const deleteItem= (id)=>{
    //     const updateItems =item.filter((a,index)=>index !==id)

    //     setItem(updateItems)
    // }


    for (let i in cart) {
        // console.log(item,"fgvhbjn")
        totalPrice += cart[i].price*cart[i].quantity
    }
    
    
    const [count,setCount]=useState(1)
    const quantity=(product)=>{
        // const [count,setCount]=useState(1)
        return(
            <>
            <button className="counter" onClick={()=>{(setCount(count+1) ,(product.quantity=count+1 ))}}>+</button>
            <span>{count}</span> 
            <button className="counter" onClick={()=>{(setCount(count-1) ,(product.quantity=count-1 ))}}>-</button>
            </>
        )
    }
    


    return <>

        <div className="cart">
            <div className="mapCart">
                {
                    cart.map((product,index) => {
                        const { _id, title, price, brand, image, fastDelivery, rating } = product;
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
                                        <h6 className="quantity">Quantity:{quantity(product)}
                                        </h6>
                                        {fastDelivery ? <h6>FastDelivery</h6> : <h6>Minimum 3-4 Days</h6>}
                                    </div>
                                    <div className="btn-container">
                                        <button className="btn"
                                            onClick={() => dispatchCart({type:"REMOVE_FROM_CART",payload:product})}
                                        >Remove From Cart</button>

                                        <button className="btn"
                                            onClick={() => {
                                                const checkWish=wish.some(item=>item._id ===product._id)
                                                if(!checkWish){
                                                    dispatchWish({
                                                        type: "ADD_TO_WISHLIST",
                                                        payload: product
                                                    })
                                                    {deleteItem(index)}
                                                }
                                             
                                            }}
                                        >Move To Wishlist</button>
                                    </div>
                                </div>

                            </div>

                        )
                    })
                }
            </div>
            <div>
                <div className="checkout">
                    <div><h1>SubTotal ({cart.length}) Items</h1>
                        <h1>Total :  ₹{totalPrice}</h1>
                    </div>
                    <div><button className="checkout-btn">Proceed To Checkout</button></div>
                </div>
            </div>
        </div>


    </>
}

export { MyCart }