import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Checkout from "./Checkout";
import {toast} from "react-toastify";

const CheckoutGuard = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        toast.info("you must provide a shipping address before checkout ")
        // Si shippingAddress n'existe pas, redirigez l'utilisateur vers la page de livraison
        return <Navigate to="/Shipping" />;
    }

    // Si shippingAddress existe, affichez la page Checkout
    return <Checkout />;
};

export default CheckoutGuard;
