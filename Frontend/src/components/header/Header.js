import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../form/searchform/searchformview';
import './headerstyle.css';
import AddProduct from '../product/addProduct';
import {IoIosNotifications} from "react-icons/io";
import {Button} from "reactstrap";
import { BrowserRouter as Router } from 'react-router-dom';
import {useSelector} from "react-redux";

const Header = (props) => {



    const stateQt=useSelector( (state)=> state.cart.cartTotalQuantity)


    const [qt,setQt] = useState(0)
    // const [loc,setLoc]=useState([])
    useEffect (  ()=>{

        setQt(stateQt)
        console.log("QQQQQQQQQQQQTTTTTTTTTTTTTTT")
        console.log(qt)
        // localStorage.setItem("newCart", JSON.stringify(...cart3));
    } ,[stateQt])


    // const state=useSelector( (state)=>state )
  //
  //   // console.log('Test Local staorage')
  //   const updatedCart = state.cart.cartItems;
  //   localStorage.setItem('cart', JSON.stringify(updatedCart));
  //   // Lors de la mise à jour de cartTotalQuantity
  //   const updatedTotalQuantity = state.cart.cartTotalQuantity;
  //    localStorage.setItem('cartTotalQuantity', updatedTotalQuantity);
  // const totalProductsCart=localStorage.getItem('cartTotalQuantity')
    // console.log(updatedCart)
    //
    // console.log(updatedTotalQuantity)


    const cartTotalQuantity=useSelector( (state)=> state.cart.cartTotalQuantity)
    const totalProductsCart = localStorage.getItem('qty')
    const [connectedUser, setConnectedUser] = useState(null);
    const emailUserConnected = localStorage.getItem('emailUserConnected')
    const nameUserConnected = localStorage.getItem('nameUserConnected')
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        localStorage.setItem('jwtToken', token);
        if (!token) {
            alert('You must be connected to create a product or comment....');
            return;
        }

        setConnectedUser(localStorage.getItem('connectedUser'));
    }, []);
const handleLougout=()=>{
    // localStorage.removeItem('nameUserConnected')
    // localStorage.removeItem('jwtToken')
    // localStorage.removeItem('emailUserConnected')
    localStorage.clear()
   window.location.href='/'
}
    const handleSignIn=()=>{
        // localStorage.clear()
        window.location.href='SignIn'
    }
    return (
        <div  id="headerContainer">
            <div id="logoContainer">
                <div id="burgerIconContainer" onClick={props.toggleSidebar}>
                    <div className="burgerSlice"></div>
                    <div className="burgerSlice"></div>
                    <div className="burgerSlice"></div>
                </div>
                <div id="logo">
                    <Link to="/">Koujina Store</Link>
                </div>
            </div>
            <div id="headerSearchFormContainer">
                <SearchForm productSearchHandler={props.productSearchHandler} />
            </div>
            <div  id="headerCartIcon">
                <div id="cartIconContainer">
                    <i
                        onClick={props.toggleShoppingCart}
                        id="cartIcon"
                        className="fa fa-shopping-basket"
                    ></i>
                    <span id="cartCounter">{qt}</span>
                </div>
            </div>

            <div  id="headerCartIcon">
                <div id="cartIconContainer">
                    <i
                        onClick={props.toggleAddProduct2}
                        id="cartIcon"
                        className="fa fa-plus"
                    ></i>
                    <span id="cartCounter">{props.totalCartItem}</span>
                </div>
            </div>


            <div  id="headerCartIcon">
                <div id="cartIconContainer">
                    <i
                        onClick={props.toggleShowCategoryDetails}
                        id="cartIcon"
                        className="fa fa-plus"
                    ></i>
                    <span id="cartCounter">15</span>
                </div>
            </div>


            {/*<div id="headerProductIcon">*/}
            {/*    <div id="cartIconContainer">*/}
            {/*        <i*/}
            {/*            onClick={props.toggleDisplayDetailsProduct}*/}
            {/*            id="cartIcon"*/}
            {/*            className="fa fa-plus"*/}
            {/*        ></i>*/}
            {/*        <span id="cartCounter">{props.totalCartItem}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {connectedUser ?(

                <>

                    <div  id="headerCartIcon">
                        <div id="cartIconContainer">
                            <i
                                onClick={props.toggleAddProduct2}
                                id="cartIcon"
                                className="fa fa-bell"
                            ></i>
                            <span id="cartCounter">3</span>
                        </div>
                    </div>

                        <div className="d-flex gap-3 align-items-center dropdown">
                            <div>
                                <img
                                    width={32}
                                    height={32}
                                    src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                                    alt=""
                                />
                            </div>
                            <div
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <h5 className="mb-0">{nameUserConnected}</h5>
                                <p className="mb-0">{emailUserConnected}</p>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <Link
                                        className="dropdown-item py-1 mb-1"
                                        style={{ height: "auto", lineHeight: "20px" }}
                                        to="/"
                                    >
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Button
                                        onClick={handleLougout}
                                        className="dropdown-item py-1 mb-1"
                                        style={{ height: "auto", lineHeight: "20px" }}
                                        to="/"
                                    >
                                        Signout
                                    </Button>
                                </li>
                            </div>
                        </div>
                </>
                    ):(


                <div id="signIn"  onClick={handleSignIn} >SIGN IN</div>


            )}


        </div>
    );

};

export default Header;
