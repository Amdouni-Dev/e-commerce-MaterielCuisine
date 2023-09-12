import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Alert} from "antd";
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
const OrderDetails=()=>{

    // stripe

    const stripePromise = loadStripe('pk_test_51Mrh47EUjH7lozT7dGmLZyQFfCeQ4yG61vK5eYuLRgib8zmeWrqomPfrCKonJyNsWvFYbq7g2hukzI1fXqH5G97g00glG9cKNY');



    //stripe


    const {orderId} = useParams();

    const handleToken = async(token) => {


        await axios.put(`http://localhost:5000/order/${orderId}/pay`)
        console.log(token); // Vous pouvez traiter le token ici
    };

const [orderData,setOrderData]=useState(null)
    const getOrder=async () => {
        try {


          const res=  await axios.get(`http://localhost:5000/order/getOrderByID/${orderId}`)
            console.log("response oder details ****************************")
            console.log(JSON.parse(JSON.stringify(res.data)))
            console.log("response oder details ****************************")
setOrderData(JSON.parse(JSON.stringify(res.data)))
        } catch (err) {
            console.log(err.message);
        }
    }



    const [connectedUser,setConnectedUser] = useState(null);
    const FToken=    async  ()=> {



        const token = localStorage.getItem('jwtToken');
        localStorage.setItem('jwtToken', token);
        if (!token) {
            alert("Vous devez être connecté pour créer un produit.");
            return;
        }

        setConnectedUser(localStorage.getItem('connectedUser'));
        // Extract the user ID from the payload


    }
    useEffect(  ()=>{
        FToken()

    } ,[] )
    const emailUserConnected = localStorage.getItem('emailUserConnected')
    const nameUserConnected = localStorage.getItem('nameUserConnected')
useEffect(  ()=>{
    getOrder()


},[] )

    if(!orderData){
        return(
            <h5>pas de données pour cette commande , verifiez l'id</h5>
        )
    }
    else{
        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div id="div1">
                        <div id="body" style={{marginLeft:"100px"}} >
                            <div className="single-service-item-two text-center wow fadeInUp" style={{ border: '1px solid orange', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <i className="fa fa-user" style={{ marginRight: '10px', fontSize: '24px', color: 'orange' }} />

                                </div>
                                <h3 className="title">Customer</h3>
                                <p>{nameUserConnected}</p>
                                <p>{emailUserConnected}</p>

                                <div id='addToCartButton'></div>

                            </div>



                            <div className="single-service-item-two text-center wow fadeInUp" style={{ border: '1px solid orange', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <i className="fa fa-truck" style={{ marginRight: '10px', fontSize: '24px', color: 'orange' }} />

                                </div>
                                <h3 className="title">
                                    Order Info
                                </h3>
                                <p>
                                    Shipping : {orderData.shippingAddress.country}
                                </p>
                                <p>
                                    Pay Method : {orderData.payementMethod}
                                </p>

                                {orderData.isPaid===true  ? (<>
                                <div  className="bg-success p-2 col-12"  style={{margin:"auto"}}>
                                    <p  style={{margin:"auto",color:"white",textAlign:"center"}} >Paid</p></div>
                                </>):(<>
                                        <div  className="bg-danger p-2 col-12"  style={{textAlign:"center",margin:"auto"}}>
                                            <p style={{margin:"auto",color:"white",textAlign:"center"}}>

                                                Not paid
                                            </p>

                                        </div>
                                    </>
                                ) }

                            </div>


                            <div className="single-service-item-two text-center wow fadeInUp" style={{ border: '1px solid orange', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

                                    <i className="fa fa-map-marker-alt" style={{ marginRight: '10px', fontSize: '24px', color: 'orange' }} />





                                </div>

                                <h3 className="title">
                                    Deliver To
                                </h3>
                                <p>
                                    Address : {orderData.shippingAddress.city} , {" "} {orderData.shippingAddress.address} {" "} , {orderData.shippingAddress.postalCode}
                                </p>

                                {orderData.isDeliverd===true  ? (<>
                                    <div id='addToCartButton'style={{backgroundColor:"lightgreen",margin:"auto"}} >
                                        <p style={{margin:"auto",color:"white",textAlign:"center"}} >

                                            Delivered</p></div>
                                </>):(<>
                                        <div  className="bg-danger p-2 col-12"   style={{margin:"auto"}}>
                                            <p style={{margin:"auto",color:"white",textAlign:"center"}} >

                                                Not delivered
                                            </p>

                                        </div>
                                    </>
                                ) }

                            </div>

                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>







                    <div style={{ display: 'flex' }}>
                        <div id="div2.1" style={{ marginRight: '200px' }}>
                            <h4 className="title mb-15">List of purchased products</h4>
                            {orderData.orderItems && orderData.orderItems.length === 0 ? (
                                <Alert variant="alert-info mt-5">Your Cart is Empty!</Alert>
                            ) : (
                                <div className="cart-table table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orderData.orderItems.map((item, index) => (
                                            <tr key={index}>


                                                <td>
                                                    <img style={{width:"50px"}} src={`http://localhost:5000/product/imageProductByID/${item._id}`}  alt=""/>

                                                    <a href={`/Products/ProductDetails/${item.product}`}>

                                                        <span className="title">{item.name}</span>
                                                    </a>
                                                </td>
                                                <td>
                                                    <h6>{item.quantity}</h6>
                                                </td>
                                                <td>{item.quantity * item.price} DT</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}


                        </div>
                        <div id="div2.2" >

                            <h4 className="title">Cart Totals</h4>
                            <div className="cart-table table-responsive">
                                <table className="table">
                                    <tbody>
                                    {/*<tr>*/}
                                    {/*    <td>Products</td>*/}
                                    {/*    <td>{orderData.cartAmount} DT</td>*/}
                                    {/*</tr>*/}
                                    <tr>
                                        <td>Shipping</td>
                                        <td>{orderData.shippingPrice}DT</td>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <td>{orderData.taxPrice}DT</td>
                                    </tr>
                                    <tr>
                                        <td className="total">
                                            <span>Order Total</span>
                                        </td>
                                        <td className="total">
                                            <span>{orderData.totalPrice}DT</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            { orderData.isPaid === false ?   (
                                <div style={{width:"500px"}}>
                                {/*<button*/}
                                {/*    // onClick={placeOrderHandler}*/}
                                {/*    id='addToCartButton'>*/}
                                {/*  Pay*/}
                                {/*</button>*/}
                                    <StripeCheckout
                                        stripeKey="pk_test_51Mrh47EUjH7lozT7dGmLZyQFfCeQ4yG61vK5eYuLRgib8zmeWrqomPfrCKonJyNsWvFYbq7g2hukzI1fXqH5G97g00glG9cKNY"
                                        name="Pay With Credit Card"
                                        description={`Your total: ${orderData.totalPrice}`} // Remplacez par le montant total
                                        amount={orderData.totalPrice} // Montant en cents (ex: 1000 pour 10.00 USD)
                                        currency="USD"
                                        billingAddress
                                        shippingAddress
                                        token={handleToken} // Fonction de gestion du token
                                    >
                                        <button id="addToCartButton">Pay Now</button>
                                    </StripeCheckout>
                                </div>
                            ):(
                                <>
                                    <button id="addToCartButton">Deja payé</button>
                                </>

                            )}
                                {/*<Elements stripe={stripePromise}>*/}
                                {/*<CheckoutForm />*/}





                            {
                                // error
                                // &&(
                                //     <div className="my-3 col12">
                                //
                                //         <Alert variant="alert-danger" >Erreur lors de la creation de la commande</Alert>
                                //     </div>
                                // )

                            }


                        </div>
                    </div>

                </div>



            </>
        )
    }

}
export default OrderDetails
