import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {ProductsProvider} from "./components/product/contextProduct/ProductsProvider";
import {ToastContainer} from "react-toastify";
import {CategoriesProvider} from "./components/category/contextCategory/CategoryProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <ProductsProvider>
        <CategoriesProvider>
    <App />
        </CategoriesProvider>
    </ProductsProvider>

  </Provider>
);
