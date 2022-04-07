import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Shirts",
    img:"https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2164410/2018/6/19/f6154681-bd6b-46d5-83ff-9b31d059f2e81529387774162-Roadster-Time-Travlr-Men-Navy--Grey-Regular-Fit-Checked-Casu-1.jpg",
    type:"SHIRTS",
    payload:"Shirt"
  },
  {
    _id: uuid(),
    categoryName: "T-shirt",
    img:"https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11487342/2020/6/17/e3958d19-7c4b-49ce-8a5c-e82ed6e6ef321592396334332-Nautica-Men-Tshirts-721592396332125-1.jpg",
    type: "TSHIRT",
    payload: "T-shirt"
  },
  {
    _id: uuid(),
    categoryName: "Shorts",
    img:"https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2381581/2018/2/15/11518686648959-HRX-by-Hrithik-Roshan-Men-Black-Solid-Regular-Fit-Sports-Shorts-2671518686648777-1.jpg",
    type:"SHORTS",
    payload:"Shorts"
  },
  
  {
    _id: uuid(),
    categoryName: "Trouser",
    img:"https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/5669588/2018/6/12/78e97040-bf89-44e1-8be4-405610955ee01528807434036-Roadster-Men-Blue-Skinny-Fit-Mid-Rise-Mildly-Distressed-Stretchable-Jeans-4491528807433906-3.jpg",
    type:"TROUSERS",
    payload:"Trousers"
  },
  {
    _id: uuid(),
    categoryName: "Shoes",
    img:"https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/6512995/2019/8/9/3f894b68-1274-465d-8ba3-12934f48290e1565332854267-HRX-by-Hrithik-Roshan-Men-Black-Sneakers-9051565332853069-1.jpg",
    type:"SHOES",
    payload:"Shoes"
  },
];
