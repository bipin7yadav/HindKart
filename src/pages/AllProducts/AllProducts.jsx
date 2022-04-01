import "./AllProducts.css";
import { Link } from "react-router-dom";
import { useProductListContext } from "../../contexts/ProductContext";




function AllProducts() {

    let { product, filterState: { bySort, byStock, byFastDelivery, byShirt, byTshirt, byShoe, byShorts, byTrousers, byRating, bySearch, byRange }, dispatchFilter, } = useProductListContext();




    const transProducts = () => {
        let sortedProducts = product;
        // console.log(sortedProducts,"cvghj")

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
        if (byShirt) {
            sortedProducts = sortedProducts.filter((a) => a.category === byShirt || a.category === byTshirt || a.category === byShoe || a.category === byShorts || a.category === byTrousers)
        }
        if (byTshirt) {
            sortedProducts = sortedProducts.filter((a) => a.category === byTshirt || a.category === byShirt || a.category === byShoe || a.category === byShorts || a.category === byTrousers)
        }
        if (byShoe) {
            sortedProducts = sortedProducts.filter((a) => a.category === byShoe || a.category === byTshirt || a.category === byShirt || a.category === byShorts || a.category === byTrousers)
        }
        if (byShorts) {
            sortedProducts = sortedProducts.filter((a) => a.category === byShorts || a.category === byShoe || a.category === byTshirt || a.category === byShirt || a.category === byTrousers)
        }
        if (byTrousers) {
            sortedProducts = sortedProducts.filter((a) => a.category === byTrousers || a.category === byShorts || a.category === byShoe || a.category === byTshirt || a.category === byShirt)
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
                    <div>
                        <h2>Sort By</h2>
                        <div>
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

                            <h2>Availability</h2>
                            <input type="checkbox"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "STOCK",
                                    })
                                }
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
                            />
                            <label>Fast Delivery</label>
                        </div>
                    </div>
                    <div>
                        <h2>Price</h2>
                        <div className="clear">
                            <label>300</label>
                            <label>{byRange}</label>
                            <label> 5500</label>
                        </div>
                        <input type="range" min="300" max="5500"
                            onChange={(e) => dispatchFilter({
                                type: "RANGE",
                                payload: e.target.value,
                            })}
                        />
                    </div>
                    <div>
                        <h2>Category</h2>

                        <div>
                            <input type="checkbox"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "SHORTS",
                                        payload: "Shorts"
                                    })
                                }
                            />
                            <label>Shorts</label>
                        </div>

                        <div>
                            <input type="checkbox"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "TSHIRT",
                                        payload: "T-shirt"
                                    })
                                }
                            />
                            <label>Tshirts</label>
                        </div>

                        <div>
                            <input type="checkbox"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "SHIRTS",
                                        payload: "Shirt"
                                    })
                                }
                            />
                            <label>Shirts</label>
                        </div>

                        <div>
                            <input type="checkbox"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "SHOES",
                                        payload: "Shoes"
                                    })
                                }
                            />
                            <label>Shoes</label>
                        </div>

                        <div>
                            <input type="checkbox"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "TROUSERS",
                                        payload: "Trousers"
                                    })
                                }
                            />
                            <label>Jeans&Trousers</label>
                        </div>
                    </div>

                    <div>
                        <h2>Rating</h2>

                        <div>
                            <input type="radio" name="rating"
                                onChange={() =>
                                    dispatchFilter({
                                        type: "RATING",
                                        payload: 4,
                                    })
                                }
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
                            />
                            <label>1 Rating & Above</label>
                        </div>


                    </div>
                </div>

                <div>
                    <div><h1>Products : {transProducts().length}</h1></div>
                    <div className="product">
                        {
                            transProducts().map((product) => {
                                const { _id, title, price, brand, image, inStock, fastDelivery, rating } = product;
                                return (
                                    <>
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
                                                        disabled={!inStock}
                                                    >Add To Cart</button>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>


            </div>
        </>)
}

export { AllProducts }