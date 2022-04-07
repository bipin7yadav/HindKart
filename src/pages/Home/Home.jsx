import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useProductListContext } from '../../contexts/ProductContext'
// import {transProducts} from "../all-products/all-products"


<transProducts/>

function Home() {
    const { category,dispatchFilter,filterState:{byShirt,byTshirt,byShoe,byShorts,byTrousers} } = useProductListContext()

    return (
        <>
            <div class="container">

            <h3 className="category">Categories Available :</h3>
            <div className="con1">
                {category.map((a) => {
                    const {img,categoryName,type,payload}=a;
                return (<>
                    <div class="img-con">
                        <img src={img} alt="./" class="img" />
                        {/* <label className="label"><Link to="/AllProducts" onClick={()=>{dispatchFilter({
                            type:{type},
                            payload:{payload}
                        })}}><span className="link">{categoryName}</span></Link></label> */}
                        <label className="label">{categoryName}</label>

                    </div>
                </>)
            })}
            </div>
                <div class="con2">
                    <img class="img2" src="https://media.istockphoto.com/photos/portrait-of-tattooed-young-man-with-black-tshirt-picture-id957256814?k=20&m=957256814&s=612x612&w=0&h=Rmc_6kUUVV6eBhCDiTVYBzPtYFCUQs3-CcwQFfIqgio=" alt="" />
                    <h2 className="adv">Exlcusive And Stylish Products <span className="highlight"> available at Affordable</span>  Price Range </h2>
                    <p className="shop"><Link to="/AllProducts"><button className="btn">Shop Now</button></Link></p>
                </div>

                <div className="con3">

                    <div className="arrival1">
                        <img className="arrive-img" src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        <div className="text">
                            <p>NEW ARRIVALS</p>
                            <div className="discp">
                                <h3>Winter Collection</h3>
                                <p>Check out our best winter collection to feel warm and comfertable in style this season </p>
                            </div>
                        </div>

                    </div>
                    <div className="arrival1">

                        <img className="arrive-img" src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        <div className="text">
                            <p>NEW ARRIVALS</p>
                            <div className="discp">
                                <h3>Summer Collection</h3>
                                <p>Check out our best summer collection to feel comfertable in style this season </p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="Categories"></div>


            </div>

        </>
    )
}

export { Home }