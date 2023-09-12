import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import {savePaymentMethod, saveShippingaddress} from "./redux/cartSlice";
import CustomInput from "../CustomInput";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionItem } from "reactstrap";
import {Form} from "antd";
import {useForm} from "antd/es/form/Form"; // Importez AccordionItem

const Checkout = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    console.log("*************************** Ceckout component *************************************");
    console.log(shippingAddress);

    if (!shippingAddress) {
        navigate("/Shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState("Cart");
    const dispatch=useDispatch()

    const submitHandler=()=>{
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/PlaceOrder")
    }
    return (
        <>
            <div style={{
                marginLeft:"250px",
                marginTop:"100px"

            }} >
                <form>
                    <div className="payment-method mb-50">
                        <h4 className="title mb-20">Payment Method</h4>
                        <Form onSubmitCapture={submitHandler}>


                            <li className="custom-control custom-radio">
                                <input
                                    value="stripe"
                                    type="radio"
                                    className="custom-control-input"
                                    id="methodone"
                                    name="defaultExampleRadios"
                                    // defaultChecked
                                    onChange={ (e)=>setPaymentMethod(e.target.value) }

                                />
                                <label htmlFor="methodone">   Direct Bank Transfer <i className="fa fa-money-check" /></label>

                            </li>

                        <p>
                            Your personal data will be used to process your order,<br/>
                            support your experience throughout this website, and for<br/>
                            other purposes described in our privacy policy.
                        </p>
                        <button id='addToCartButton'>Place Order</button>
                        </Form>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Checkout;
