import { v4 as uuid } from "uuid";

export const categories = [
  {
    _id: uuid(),
    categoryName: "Casual & Formal Shirts",
    img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
    type: "SHIRTS",
    payload: "Shirt",
  },
  {
    _id: uuid(),
    categoryName: "Trending T-Shirts",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    type: "TSHIRT",
    payload: "T-shirt",
  },
  {
    _id: uuid(),
    categoryName: "Active Shorts",
    img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
    type: "SHORTS",
    payload: "Shorts",
  },
  {
    _id: uuid(),
    categoryName: "Jeans & Trousers",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    type: "TROUSERS",
    payload: "Trousers",
  },
  {
    _id: uuid(),
    categoryName: "Footwear & Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    type: "SHOES",
    payload: "Shoes",
  },
];
