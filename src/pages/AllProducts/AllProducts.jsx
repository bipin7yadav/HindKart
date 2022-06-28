import "./AllProducts.css";
import { Link } from "react-router-dom";
import { useProductListContext } from "../../contexts/ProductContext";
import { toast } from "react-toastify";





function AllProducts() {

    let { product, filterState: { bySort, byStock, byFastDelivery,category, byRating, bySearch, byRange }, dispatchFilter, dispatchCart, dispatchWish, cartState: { cart }, wishState: { wish } } = useProductListContext();

    // const { short, tshirt, shirt, shoe, trouser } = byCategories


    const arrayOfProducts = [
        "Shorts",
        "T-shirt",
        "Shirt",
        "Shoes",
        "Trousers"
        ];

    const transProducts = () => {

        let sortedProducts = product;


        if (bySort) {
            sortedProducts = sortedProducts.sort((a, b) =>
                bySort === "lowToHigh" ? a.price - b.price : b.price - a.price

            )
        }

        if (byStock) {
            sortedProducts = sortedProducts.filter((a) => a.inStock)

        }
        if (bySearch) {
            sortedProducts = sortedProducts.filter((a) => a.title.toLowerCase().includes(bySearch))
        }
        if (byRange) {
            sortedProducts = sortedProducts.filter((a) => a.price < byRange)
            console.log(byRange, "byRange")
        }

        if (byFastDelivery) {

            sortedProducts = sortedProducts.filter((a => a.fastDelivery))
        }
        if (category[0]!==undefined) {
            sortedProducts = sortedProducts.filter(data => category.includes(data.categoryName))
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter((a) => a.rating >= byRating)
        }

        // console.log(sortedProducts,"product")
        return sortedProducts


    }


    return (
        <>
            <div className="product-page">
                <div className="filters">
                    <div className="clear">
                        <h3>Filters</h3>
                        <Link to=""
                            onClick={() => {
                                dispatchFilter({
                                    type: "CLEAR",
                                })
                            }}><h3>Clear</h3></Link>
                    </div>
                    <hr />
                    <div>
                        <div>
                            <h4>Sort By</h4>
                            <input type="radio" name="radio"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "SORT",
                                        payload: "lowToHigh"
                                    })
                                }
                                checked={bySort === "lowToHigh" ? true : false}

                            />
                            <label>Price: Low To High</label>
                        </div>
                        <div>
                            <input type="radio" name="radio"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "SORT",
                                        payload: "highToLow"
                                    })
                                }
                                checked={bySort === "highToLow" ? true : false}
                            />
                            <label>Price: High To Low</label>
                        </div>
                    </div>

                    <div>
                        <div>

                            <h4>Availability</h4>
                            <input type="checkbox"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "STOCK",
                                    })
                                }
                                checked={byStock}
                            />
                            <label>Instock</label>
                        </div>

                        <div>
                            <input type="checkbox"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "DELIVERY",
                                    })
                                }
                                checked={byFastDelivery}
                            />
                            <label>Fast Delivery</label>
                        </div>
                    </div>
                    <div>
                        <h4>Price</h4>
                        <div className="clear">
                            <label>₹300</label>
                            <label>₹{byRange}</label>
                            <label>₹5500</label>
                        </div>
                        <input className="clearRange" type="range" min="300" max="5500"
                            onChange={(e) => dispatchFilter({
                                type: "RANGE",
                                payload: e.target.value,
                            })
                            }
                        />
                    </div>
                    <div>
                        <h4>Category</h4>


                        <div>
                            {arrayOfProducts.map(product => {
                                return(
                                    <div>
                                        <input type="checkbox"
                                            onChange={() =>
                                                dispatchFilter({
                                                    type: "CATEGORY",
                                                    payload: product
                                                })
                                            }
                                            checked={category.includes(product)}
                                        />
                                        <label>{product}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h4>Rating</h4>

                        <div>
                            <input type="radio" name="rating"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "RATING",
                                        payload: 4,
                                    })
                                }
                                checked={byRating === 4}
                            />
                            <label>4 Rating & Above</label>
                        </div>

                        <div>
                            <input type="radio" name="rating"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "RATING",
                                        payload: 3,
                                    })
                                }
                                checked={byRating === 3}
                            />
                            <label>3 Rating & Above</label>
                        </div>

                        <div>
                            <input type="radio" name="rating"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "RATING",
                                        payload: 2,
                                    })
                                }
                                checked={byRating === 2}
                            />
                            <label>2 Rating & Above</label>
                        </div>

                        <div>
                            <input type="radio" name="rating"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "RATING",
                                        payload: 1,
                                    })
                                }
                                checked={byRating === 1}
                            />
                            <label>1 Rating & Above</label>
                        </div>


                    </div>
                </div>
                <hr/>

                <div>
                    <div className="productLength"><h1>Total Products Available : {transProducts().length}</h1></div>
                    <div className="product">
                        {
                            transProducts().map((product, index) => {
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
                                                <div>Rating : {rating}⭐</div>
                                                <h6>Price :₹ {price}</h6>
                                                {inStock ? <h6>Instock</h6> : <h6>Outoff Stock</h6>}
                                                {fastDelivery ? <h6>FastDelivery</h6> : <h6>Minimum 3-4 Days</h6>}
                                            </div>
                                            <div className="btn-container">
                                                {
                                                    cart.some(i => i._id === _id) ? (
                                                        <button className="btn">Added To The Cart</button>
                                                    ) : (<button className="btn"
                                                        onClick={() => {
                                                            toast.success("added to cart")
                                                            dispatchCart({
                                                                type: "ADD_TO_CART",
                                                                payload: product
                                                            })
                                                        }}
                                                        disabled={!inStock}
                                                    >Add To Cart</button>)
                                                }

                                                {
                                                    wish.some(i => i._id === _id) ? (
                                                        <Link to="/Wishlist"><button className="btn">Visit Wishlist</button></Link>
                                                    ) : (
                                                        <button className="btn"
                                                            onClick={() => {
                                                                toast.success("added to wish list")
                                                                dispatchWish({
                                                                    type: "ADD_TO_WISHLIST",
                                                                    payload: product
                                                                })


                                                            }}
                                                        >Add To Wishlist</button>
                                                    )
                                                }


                                            </div>
                                        </div>

                                    </div>

                                )
                            })
                        }
                    </div>
                </div>


            </div>
        </>)
}

export { AllProducts }