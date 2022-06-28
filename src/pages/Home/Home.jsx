import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useProductListContext } from '../../contexts/ProductContext'
import { BsFillArrowRightCircleFill } from "react-icons/bs";


<transProducts />

function Home() {
    const { category, dispatchFilter } = useProductListContext()

    return (
        <>
            <div class="container">

                <div className="con2">
                    <img className="img2" src="https://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <div className="con2-sub">
                        <h2 className="adv">Exlcusive And Stylish Products <span className="highlight"> available at Affordable</span>  Price Range </h2>
                        <h1 className="shop"><Link to="/AllProducts"><BsFillArrowRightCircleFill /></Link></h1>
                    </div>
                </div>

                <div className="category">
                    <h3 className="categoryLabel">Categories Available :</h3>
                    <div className="con1">
                        {category.map((a) => {
                            const { img, categoryName, type, payload } = a;
                            return (<>
                                <div class="img-con">
                                    <img src={img} alt="./" class="img" />
                                    <label className="label" >
                                        <Link to="AllProducts"
                                            onClick={() => {
                                                console.log(payload, "cName");
                                                dispatchFilter({
                                                    type: "CATEGORY",
                                                    payload: payload
                                                })
                                            }}
                                        >{categoryName
                                            }</Link>
                                    </label>

                                </div>
                            </>)
                        })}
                    </div>
                </div>



            </div>

        </>
    )
}

export { Home }