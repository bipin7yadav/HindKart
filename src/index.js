import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {ProductListProvider} from "./contexts/ProductContext"
import { AuthProvider } from "./contexts/AuthContext";



// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ProductListProvider>
        <App />
      </ProductListProvider>
    </AuthProvider> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
