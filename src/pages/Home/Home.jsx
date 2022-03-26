import React from "react";
import {Link} from "react-router-dom";
import "./Home.css";




function Home(){

    return(
    <>
    {/* <h1>Home work in progress</h1>
    <Link to="/SingleProduct"><button>SingleProduct</button></Link> */}
        <div class="container">

            <h3 className="category">Categories </h3>
    
    
            <div class="con1">
    
                <div class="img-con">
                    <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2164410/2018/6/19/f6154681-bd6b-46d5-83ff-9b31d059f2e81529387774162-Roadster-Time-Travlr-Men-Navy--Grey-Regular-Fit-Checked-Casu-1.jpg" alt="./" class="img"/>
                    <label class="label">Shirts</label>
    
                </div>
    
                <div class="img-con">
                    <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11487342/2020/6/17/e3958d19-7c4b-49ce-8a5c-e82ed6e6ef321592396334332-Nautica-Men-Tshirts-721592396332125-1.jpg" alt="./" class="img"/>
                    <label class="label">T-Shirts</label>
                </div>
    
                <div class="img-con">
                    <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2381581/2018/2/15/11518686648959-HRX-by-Hrithik-Roshan-Men-Black-Solid-Regular-Fit-Sports-Shorts-2671518686648777-1.jpg" alt="./" class="img"/>
                    <label class="label">Shorts</label>
                </div>
    
                <div class="img-con">
                    <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/5669588/2018/6/12/78e97040-bf89-44e1-8be4-405610955ee01528807434036-Roadster-Men-Blue-Skinny-Fit-Mid-Rise-Mildly-Distressed-Stretchable-Jeans-4491528807433906-3.jpg" alt="./" class="img"/>
                    <label class="label">Jeans </label>
                </div>
    
                <div class="img-con">
                    <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/6512995/2019/8/9/3f894b68-1274-465d-8ba3-12934f48290e1565332854267-HRX-by-Hrithik-Roshan-Men-Black-Sneakers-9051565332853069-1.jpg" alt="./" class="img"/>
                    <label class="label">Shoes</label>
                </div>
    
    
            </div>
    
            <div class="con2">
                <img class="img2" src="https://media.istockphoto.com/photos/portrait-of-tattooed-young-man-with-black-tshirt-picture-id957256814?k=20&m=957256814&s=612x612&w=0&h=Rmc_6kUUVV6eBhCDiTVYBzPtYFCUQs3-CcwQFfIqgio=" alt=""/>
                <h2 class="adv">Exlcusive And Stylish Products <span class="highlight"> available at Affordable</span>  Price Range </h2>
                <p className="shop"><Link to="/AllProducts"><button>Shop Now</button></Link></p>
            </div>
    
            <div class="con3">
    
                <div class="arrival1">
                    <img class="arrive-img" src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt=""/>
                    <div class="text">
                        <p>NEW ARRIVALS</p>
                        <div class="discp">
                            <h3>Summer Collection</h3>
                            <p>Check out our best summer collection to feel comfertable in style this season </p>
                        </div>
                    </div>
    
                </div>
                <div class="arrival1">
    
                    <img class="arrive-img" src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt=""/>
                    <div class="text">
                        <p>NEW ARRIVALS</p>
                        <div class="discp">
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

export {Home}