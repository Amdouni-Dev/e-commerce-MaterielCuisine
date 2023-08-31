import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SearchForm from '../form/searchform/searchformview';
import './headerstyle.css';
import AddProduct from "../product/addProduct";
import Addproduct from "../../pages/Addproduct";

export default class Header extends Component {

    render() {

        return (
            <div id='headerContainer'>
                <div id='logoContainer'>
                    <div id='burgerIconContainer' onClick={this.props.toggleSidebar}>
                        <div className='burgerSlice'></div>
                        <div className='burgerSlice'></div>
                        <div className='burgerSlice'></div>
                    </div>
                    <div id='logo'><Link to='/'>Koujina Store</Link></div>
                </div>
                <div id='headerSearchFormContainer'>
                    <SearchForm
                        productSearchHandler={this.props.productSearchHandler}
                    />
                </div>
                <div style={{marginLeft:"-50px"}} id='headerCartIcon'>
                    <div id='cartIconContainer'>
                        <i
                            onClick={this.props.toggleShoppingCart}
                            id='cartIcon'
                            className='fa fa-shopping-basket'
                        ></i>
                        <span id='cartCounter'>{this.props.totalCartItem}</span>
                    </div>
                </div>

                {/*<div style={{marginLeft:"-50px", marginRight:"20px"}} id='headerProductIcon'>*/}
                {/*    <div id='cartIconContainer'>*/}
                {/*        <i*/}
                {/*            onClick={this.props.toggleAddProduct}*/}
                {/*            id='cartIcon'*/}
                {/*            className='fa fa-plus'*/}
                {/*        ></i>*/}
                {/*        <span id='cartCounter'>{this.props.totalCartItem}</span>*/}
                {/*    </div>*/}

                {/*</div>*/}

                <div style={{marginLeft:"-50px", marginRight:"20px"}}  id='headerProductIcon'>
                    <div id='cartIconContainer'>
                        <i
                            onClick={this.props.toggleAddProduct2}
                            id='cartIcon'
                            className='fa fa-plus'
                        ></i>
                        <span id='cartCounter'>{this.props.totalCartItem}</span>
                    </div>
                </div>



                <div  id='headerProductIcon'>
                    <div id='cartIconContainer'>
                        <i
                            onClick={this.props.toggleDisplayDetailsProduct}
                            id='cartIcon'
                            className='fa fa-plus'
                        ></i>
                        <span id='cartCounter'>{this.props.totalCartItem}</span>
                    </div>
                </div>



                <div id='signIn'>SIGN IN</div>
            </div>
        );
    }
}
