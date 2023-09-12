import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { store } from "./app/store";
// import store from "./components/order/redux/Store";
import { Provider } from "react-redux";
import {ProductsProvider} from "./components/product/contextProduct/ProductsProvider";
import {ToastContainer} from "react-toastify";
import {CategoriesProvider} from "./components/category/contextCategory/CategoryProvider";
import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./components/order/redux/cartSlice"; // export default cartSlice.reducer;

const root = ReactDOM.createRoot(document.getElementById("root"));
const store =configureStore({
    reducer:{
        cart:cartReducer,
    },
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat()
})
root.render(

  <Provider
      store={store}
  >
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <ProductsProvider>
        <CategoriesProvider>
    <App />
        </CategoriesProvider>
    </ProductsProvider>

  </Provider>
);
