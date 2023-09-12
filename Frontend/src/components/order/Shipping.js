import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {saveShippingaddress} from "./redux/cartSlice";
import CustomInput from "../CustomInput";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const  Shipping=()=>{
    const cart =useSelector( (state)=>state.cart );
    const {shippingAddress}=cart
    const navigate=useNavigate()
const confirmProducts=()=>{
    if(!cart.cartItems.length>=1){
        toast.info("vous devez mettre au moins un produit dans votre carte avant de passer au shipping")
        navigate('/Header')
    }
}

useEffect(  ()=>{
    confirmProducts()
},[] )


    const [address,setAddress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country,setCountry]=useState(shippingAddress.country)
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingaddress({address,city,postalCode,country} ))
        navigate('/Checkout')
    }
    return (
        <>
        {/*<h1>Good Mouna, you do a good work !!</h1>*/}



    <div style={{
        marginLeft:"250px",
       marginTop:"100px"

    }} >

                                {/* <h4 className="title mb-15">Delivery</h4> */}
                                <form
                                    onSubmit={submitHandler}
                                    className="checkout-form"
                                >

                                            <h5 style={{textAlign:"center"}} >Delivery Address</h5>



                                                 <CustomInput
                                                    type="text"
                                                    className="form_control"
                                                    label="Enter Address"
                                                    name="address"
                                                    required
                                                    val={address} onChng={ (e)=>setAddress(e.target.value) }
                                                />



                                            <div className="form_group">
                                                <CustomInput
                                                    type="text"
                                                    className="form_control"
                                                    label="Enter City"
                                                    name="city"
                                                    required
                                                    val={city}
                                                    onChng={ (e)=>setCity(e.target.value) }
                                                />
                                            </div>

                                            <div className="form_group">
                                                <CustomInput
                                                    type="text"
                                                    className="form_control"
                                                    label="Enter Postal Code"
                                                    name="code"
                                                    required
                                                    val={postalCode}
                                                    onChng={ (e)=>setPostalCode(e.target.value) }
                                                />
                                            </div>


                                            <div className="form_group">
                                                <CustomInput
                                                    type="text"
                                                    className="form_control"
                                                    label="Enter Country"
                                                    name="country"
                                                    required
                                                    val={country}
                                                    onChng={ (e)=>setCountry(e.target.value) }
                                                />
                                                <br/>
                                                <button type="submit"     id='addToCartButton'>
                                                    {/* <Link  href="#" ></Link> */}
                                                    Continue
                                                </button>











</div>

                                </form>




                </div>

            </>
    )
}
export default Shipping

