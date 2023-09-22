import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import {FormProvider} from "./components/FormContext";
import SignIn from "./pages/SignIn";
import Header from "./components/header/Header";
import HomeScreen from "./components/screens/home/homescreen";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addToCart} from "./components/order/redux/cartSlice";
import CategoryDetail from "./components/category/CategoryDetail";

function App() {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Récupérer les données du panier depuis le localStorage
  //   const savedCart = JSON.parse(localStorage.getItem('cart'));
  //   const savedCartAmount = localStorage.getItem('cartAmount');
  //   const savedQty = localStorage.getItem('qty');
  //
  //   // Initialiser le panier dans le Redux Store
  //   if (savedCart) {
  //     dispatch(addToCart(savedCart));
  //   }
  //
  //   // Initialiser d'autres données de panier si nécessaire
  //   // dispatch(initializeCartAmount(savedCartAmount));
  //   // dispatch(initializeCartTotalQuantity(savedQty));
  // }, [dispatch]);
//   useEffect( ()=> {
//
//
//
// const cartee=localStorage.getItem('carta')
//     localStorage.setItem('carta2', cartee)
//     console.log("carte")
//     console.log(localStorage.getItem('carta2'))
//     console.log("carte")
//
//
//       localStorage.setItem('qnt', 0)
//
//
//
//     const token = localStorage.getItem('jwtToken');
//
//     localStorage.setItem('jwtToken', token);
//
//     if (!token) {
//       alert("Vous devez être connecté pour créer un produit.");
//       return;
//     }
// const emailUserConnected = localStorage.getItem('emailUserConnected')
// localStorage.setItem('emailUserConnected', emailUserConnected)
//
//   } )
const myFunction=       async () => {
    try {
        const cartee = localStorage.getItem('carta');
        localStorage.setItem('carta2', cartee);
        console.log("carte");
        console.log(localStorage.getItem('carta2'));
        console.log("carte");

        localStorage.setItem('qnt', 0);

        const token = localStorage.getItem('jwtToken');
        localStorage.setItem('jwtToken', token);

        if (!token) {
            alert("Vous devez être connecté pour créer un produit.");
            return;
        }

        const emailUserConnected = localStorage.getItem('emailUserConnected');
        localStorage.setItem('emailUserConnected', emailUserConnected);

        // Mettez ici d'autres opérations asynchrones si nécessaire

    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
}

    useEffect(()=>{myFunction()});

  return (
    <Router>
      <FormProvider>




      <Routes>

        <Route path="/" element={<Login />} />
        {/*<Route  path="/Header" element={<HomeScreen />} ></Route>*/}
          {/*<Route path="/Header/c/:categoryId" element={<CategoryDetail />} />*/}
          <Route path="/Header" element={<HomeScreen />} />
          <Route path="/Header/c/:categoryId" element={<HomeScreen />} />
          <Route path="/Shipping" element={<HomeScreen />} />
          <Route path="/Checkout" element={<HomeScreen />} />
          <Route path="/PlaceOrder" element={<HomeScreen />} />
          <Route path="/Order/:orderId" element={<HomeScreen />} />
          <Route path="/Orders/:userId" element={<HomeScreen />} />
          <Route path="/SignIn" element={<SignIn/>}></Route>
        <Route path="/reset-password/:id/:token" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
        </Route>
      </Routes>
      </FormProvider>
    </Router>
  );
}

export default App;
