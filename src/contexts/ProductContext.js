import axios from "axios";
import { createContext, useContext, useEffect, useState ,useReducer } from "react";

const productList = createContext();

const ProductListProvider = ({children  }) => {


    // products
    const [product, setProduct ] = useState([]);

    useEffect(()=>{
        (async () => {
            try{const response = await axios.get("/api/products");
            setProduct(response.data.products)
        }
        catch (error){
            console.log(error)
        }
        })();
    },[]);


    //categories

    const [category,setCategory]=useState([]);

    useEffect(()=>{
        (async()=>{
            try{const response=await axios.get("/api/categories")
            setCategory(response.data.categories)
        }
        catch(error){
            console.log(error)
        }
        })();
    },[])




    const FilterReducer = (state,action) =>{
        console.log(action.type,"type...");
        console.log(action.payload, "payload...");

        switch(action.type){
            case "SORT":{
                return{
                    ...state,
                    bySort:action.payload
                }
            };
            case "STOCK":{
                return{
                    ...state,
                    byStock: !state.byStock            
                }
            };
            case "DELIVERY":{
                return{
                    ...state,
                    byFastDelivery: !state.byFastDelivery           }
            };
            case "RATING":{
                return{
                    ...state,
                    byRating: action.payload            
                }
            };
            case "RANGE":{
                return{
                    ...state,
                    byRange: action.payload            
                }
            };
            case "SEARCH":{
                return{
                    ...state,
                    bySearch: action.payload            
                }
            };
            case "CLEAR":{
                return{
                    byStock:false,byFastDelivery:false,byRating:0,sort:null,category:[]            
                }
            };
            case "CATEGORY":{
                // console.log(action.type,"in Category type");
                // console.log(action.payload,"in payload type");

                if(!state.category.includes(action.payload)){
                    return {...state, category:[...state.category,action.payload]};
                }else{
                    const array = state.category.filter(data => data !==action.payload);
                    return {...state,category:array};
                }
                  
            }
        
            default :
                return state;
        }
    };

    const [filterState,dispatchFilter]=useReducer(FilterReducer,{
        byStock:false,
        byFastDelivery:false,
        byRating:0,
        bySort:null,
        category:[],
        byRating:null,
        bySearch:"",
        byRange:null,
        // byCategories:{short:false,tshirt:false,shirt:false,trouser:false,shoe:false}

    });

    const cartReducer = (state,action)=>{
        console.log("Vvv",action.type)
        console.log("cart",state.cart);
        switch (action.type){
            case "ADD_TO_CART":
                return{
                    ...state,
                    cart :[...state.cart,{...action.payload}]
                };
            case "REMOVE_FROM_CART":
                const newCartArr = state.cart.filter(data => data.id !== action.payload.id)
                console.log("ddddddd",newCartArr)
                return{
                    ...state,
                    cart:newCartArr}
            
             
            default:
                return state;
        }
    }

    const wishReducer = (state,action)=>{
        switch (action.type){
            case "ADD_TO_WISHLIST":{
                return{
                    ...state,wish :[...state.wish,{...action.payload}]
                }
            };
            case "MOVE_TO_CART":{
                return{
                    ...state,
                    wish:[...action.payload]
                }
            }
            default:
                return state;
        }
    }

    const [cartState,dispatchCart]=useReducer(cartReducer,{
        // products:product,
        cart :[],
    })


    const [wishState,dispatchWish]=useReducer(wishReducer,{
        // products:product,
        wish :[],
    })

    return(
         <productList.Provider value={{product,category,filterState,dispatchFilter,cartState,dispatchCart,wishState,dispatchWish}}>
             {children}
         </productList.Provider>
    )
}

const useProductListContext = () => useContext(productList);

export { useProductListContext, ProductListProvider }