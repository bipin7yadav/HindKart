import axios from "axios";
import { createContext, useContext, useEffect, useState, useReducer } from "react";

const productList = createContext();

const ProductListProvider = ({ children }) => {
  // Products
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/products");
        // Enrich products with sizes and originalPrice if missing
        const processedProducts = (response.data.products || []).map((p) => {
          const discountPercent = parseInt(p.discount) || 40;
          const origPrice = p.originalPrice || Math.round(p.price / (1 - discountPercent / 100));
          return {
            ...p,
            originalPrice: origPrice > p.price ? origPrice : Math.round(p.price * 1.8),
            quantity: p.quantity || 1,
            selectedSize: p.selectedSize || "M",
            sizes: p.sizes || ["S", "M", "L", "XL", "XXL"],
          };
        });
        setProduct(processedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Categories
  const [category, setCategory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategory(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  // Filter Reducer
  const FilterReducer = (state, action) => {
    switch (action.type) {
      case "SORT":
        return { ...state, bySort: action.payload };
      case "STOCK":
        return { ...state, byStock: !state.byStock };
      case "DELIVERY":
        return { ...state, byFastDelivery: !state.byFastDelivery };
      case "RATING":
        return { ...state, byRating: action.payload };
      case "RANGE":
        return { ...state, byRange: action.payload };
      case "SEARCH":
        return { ...state, bySearch: action.payload };
      case "CATEGORY":
        if (state.category.includes(action.payload)) {
          return {
            ...state,
            category: state.category.filter((cat) => cat !== action.payload),
          };
        } else {
          return { ...state, category: [...state.category, action.payload] };
        }
      case "SET_CATEGORY":
        return { ...state, category: [action.payload] };
      case "BRAND":
        if (state.brand.includes(action.payload)) {
          return {
            ...state,
            brand: state.brand.filter((b) => b !== action.payload),
          };
        } else {
          return { ...state, brand: [...state.brand, action.payload] };
        }
      case "CLEAR":
        return {
          byStock: false,
          byFastDelivery: false,
          byRating: 0,
          bySort: null,
          category: [],
          brand: [],
          bySearch: "",
          byRange: 6000,
        };
      default:
        return state;
    }
  };

  const [filterState, dispatchFilter] = useReducer(FilterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    bySort: null,
    category: [],
    brand: [],
    bySearch: "",
    byRange: 6000,
  });

  // Cart Reducer
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART": {
        const existingItem = state.cart.find((item) => item._id === action.payload._id);
        if (existingItem) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item._id === action.payload._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1, selectedSize: action.payload.selectedSize || "M" }],
        };
      }
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item._id !== action.payload._id),
        };
      case "INCREMENT_QUANTITY":
      case "INCREASE_QTY":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      case "DECREMENT_QUANTITY":
      case "DECREASE_QTY":
        return {
          ...state,
          cart: state.cart
            .map((item) =>
              item._id === action.payload._id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        };
      case "UPDATE_SIZE":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, selectedSize: action.payload.size }
              : item
          ),
        };
      case "CLEAR_CART":
        return { ...state, cart: [] };
      default:
        return state;
    }
  };

  // Wishlist Reducer
  const wishReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_WISHLIST":
        if (state.wish.some((item) => item._id === action.payload._id)) {
          return state;
        }
        return {
          ...state,
          wish: [...state.wish, action.payload],
        };
      case "REMOVE_FROM_WISHLIST":
        return {
          ...state,
          wish: state.wish.filter((item) => item._id !== action.payload._id),
        };
      case "TOGGLE_WISHLIST": {
        const exists = state.wish.some((item) => item._id === action.payload._id);
        if (exists) {
          return {
            ...state,
            wish: state.wish.filter((item) => item._id !== action.payload._id),
          };
        } else {
          return {
            ...state,
            wish: [...state.wish, action.payload],
          };
        }
      }
      default:
        return state;
    }
  };

  const [cartState, dispatchCart] = useReducer(cartReducer, { cart: [] });
  const [wishState, dispatchWish] = useReducer(wishReducer, { wish: [] });

  return (
    <productList.Provider
      value={{
        product,
        loading,
        category,
        filterState,
        dispatchFilter,
        cartState,
        dispatchCart,
        wishState,
        dispatchWish,
      }}
    >
      {children}
    </productList.Provider>
  );
};

const useProductListContext = () => useContext(productList);

export { useProductListContext, ProductListProvider };