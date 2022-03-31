import axios from "axios";
import { createContext, useContext, useEffect, useState ,useReducer } from "react";

const productList = createContext();

const ProductListProvider = ({children  }) => {

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

    const FilterReducer = (state,action) =>{
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
                    byStock:false,byFastDelivery:false,byRating:0,sort:null            
                }
            };
            case "SHIRTS":{
                return{
                    ...state,
                    byShirt:action.payload
                }
            }
            case "TSHIRT":{
                return{
                    ...state,
                    byTshirt:action.payload
                }
            }
            case "SHORTS":{
                return{
                    ...state,
                    byShorts:action.payload
                }
            }
            case "TROUSERS":{
                return{
                    ...state,
                    byTrousers:action.payload
                }
            }
            case "SHOES":{
                return{
                    ...state,
                    byShoe:action.payload
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
        byShirt:null,
        byTshirt:null,
        byShorts:null,
        byTrousers:null,
        byShoe:null,
        byRating:null,
        bySearch:"",
        byRange:null

    });

    

    return(
         <productList.Provider value={{product,filterState,dispatchFilter}}>
             {children}
         </productList.Provider>
    )
}

const useProductListContext = () => useContext(productList);

export { useProductListContext, ProductListProvider }