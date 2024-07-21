import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import { useProductListContext } from "../../contexts/ProductContext"
import "./cart.css"


function MyCart() {

    const { cartState: { cart }, dispatchWish, dispatchCart, wishState: { wish } } = useProductListContext()
    const {
        state: { userInfo, token, isLoggedIn },
        logoutHandler,
      } = useAuth();
    let totalPrice = 0;



    for (let i in cart) {
        totalPrice += cart[i].price * cart[i].quantity
    }


    const [count, setCount] = useState(1)
    const quantity = (product) => {
        return (
            <>
                <button className="counter" onClick={() => { (setCount(count + 1), (product.quantity = count + 1)) }}>+</button>
                <span>{count}</span>
                <button className="counter" onClick={() => {
                    if(count>1){
                        (setCount(count - 1), (product.quantity = count - 1)) }}
                    }
                     >-</button>
            </>
        )
    }


    const loadScript = async src => {
        return new Promise(resolve => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };
    const proceedToPay = () => {
        razorpayCheckout();
      };
    
      const razorpayCheckout = async () => {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
    
        const options = {
          key: "rzp_test_EU0kcQFKEdII0m",
          currency: "INR",
          amount: totalPrice * 100,
          name: "nextstore",
          description: "Thank you for shopping with us",
          theme: { color: "#2563eb" },
          handler: function (response) {
            const paymentId = response.razorpay_payment_id;
            const orderId = uuid();
            clearCartService(token, dispatch);
            navigate("/order-summary", { state: { orderId } });
          },
          prefill: {
            name: userInfo.firstName,
            email: "bipinyadav@example.com",
            contact: "1111162884",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };



    return <>

        {cart.length > 0 ? <div className="cart">
            <div className="mapCart">
                {
                    cart.map((product, index) => {
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
                                        <button className="btn1"
                                            onClick={
                                                () => {
                                                    toast.success("removed from cart")
                                                    dispatchCart({ type: "REMOVE_FROM_CART", payload: product })
                                                }
                                            }
                                        >Remove From Cart</button>

                                        <button className="btn1"
                                            onClick={() => {
                                                const checkWish = wish.some(item => item._id === product._id)
                                                if (!checkWish) {
                                                    toast.info("moved to wish list")
                                                    dispatchWish({
                                                        type: "ADD_TO_WISHLIST",
                                                        payload: product
                                                    })

                                                    dispatchCart({ type: "REMOVE_FROM_CART", payload: product })
                                                    // {deleteItem(index)}
                                                } else {
                                                    toast.info("already in wishlist")
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
                    <div><button className="checkout-btn"
                    onClick={ proceedToPay}
                    >Proceed To Checkout</button></div>
                </div>
            </div>
        </div>
            :
            <div className="cart-message-container">
                <h3>Hey, it feels so light!</h3>
                <p>There is nothing in your bag. Let's add some items.</p>
                <Link className="btn btn-primary-outline" to="/AllProducts">
                  Add Items To Cart
                </Link>
              </div>
            }


    </>
}

export { MyCart }