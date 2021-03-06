import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {ProductListProvider} from "./contexts/ProductContext"



// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductListProvider>
        <App />
      </ProductListProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
