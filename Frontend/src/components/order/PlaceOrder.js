import {useDispatch, useSelector} from "react-redux";
import ShoppingCart from "../shoppingcart/shoppingcartview";
import {Alert} from "antd";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createOrder} from "./redux/orderSlice";
import {useEffect, useState} from "react";
import {viderCarte} from "./redux/cartSlice";

const PlaceOrder=()=>{
const navigate=useNavigate()

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

    const cart=useSelector( (state)=> state.cart )
    const [orderId,setOrderId]=useState(null)
    const [success,setSuccess]=useState(false)
if(cart.cartItems.length === 0){
    navigate('/Header')
    toast.info('vous devez au moins ajouter un produitdans votre panier')
}
const dispatch=useDispatch()




    const placeOrderHandler = async () => {
        try {
            const orderId = await dispatch(
                createOrder({
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    user: connectedUser,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                })
            );

            if (orderId) {
                console.log("Order created");
                console.log(orderId);
                toast.success("Order created with ID: " + orderId);
                setOrderId(orderId);
                setSuccess(true);

                navigate(`/Order/${orderId}`);
            } else {
                toast.error("Une erreur s'est produite lors de la création de la commande.");
            }
        } catch (error) {
            console.error("Erreur lors de la création de la commande :", error.message);
            toast.error("Une erreur s'est produite lors de la création de la commande.");
        }
    };


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
                        Shipping : {cart.shippingAddress.country}
                    </p>
                    <p>
                        Pay Method : {cart.paymentMethod}
                    </p>

                    <div id='addToCartButton'></div>

                </div>


                <div className="single-service-item-two text-center wow fadeInUp" style={{ border: '1px solid orange', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

                        <i className="fa fa-map-marker-alt" style={{ marginRight: '10px', fontSize: '24px', color: 'orange' }} />





                    </div>

                    <h3 className="title">
                        Deliver To
                    </h3>
                    <p>
                        Address : {cart.shippingAddress.city} , {" "} {cart.shippingAddress.address} {" "} , {cart.shippingAddress.postalCode}
                    </p>


                    <div id='addToCartButton'></div>
                </div>

    </div>
</div>
<br/>
                <br/>
                <br/>







                <div style={{ display: 'flex' }}>
                    <div id="div2.1" style={{ marginRight: '200px' }}>
                                    <h4 className="title mb-15">List of purchased products</h4>
                                    {cart.cartItems.length === 0 ? (
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
                                                {cart.cartItems.map((item, index) => (
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
                                        <tr>
                                            <td>Products</td>
                                            <td>{cart.cartAmount} DT</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td>{cart.shippingPrice}DT</td>
                                        </tr>
                                        <tr>
                                            <td>Tax</td>
                                            <td>{cart.taxPrice}DT</td>
                                        </tr>
                                        <tr>
                                            <td className="total">
                                                <span>Order Total</span>
                                            </td>
                                            <td className="total">
                                                <span>{cart.totalPrice}DT</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
        </div>
                                    {cart.cartItems.length === 0 ? null : (
                                        <button
                                            onClick={placeOrderHandler}
                                            id='addToCartButton'>
                                            Pass to Pay
                                        </button>
                                    )}


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
export default PlaceOrder
