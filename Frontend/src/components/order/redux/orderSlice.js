import {toast} from "react-toastify";
import axios from "axios";
import {viderCarte} from "./cartSlice";

export const createOrder=(order)=>async (dispatch,getState)=>{

    try{
    const response=   await axios.post('http://localhost:5000/order/addOrder',order)

        console.log("444444*******************************444444444444444444")
        const rep=JSON.stringify(response.data._id)
console.log(JSON.parse(rep))
        console.log("444444*******************************444444444444444444")
        dispatch(viderCarte())
        return JSON.parse(rep);

    }catch(e){
        toast.error(e.message)
    }


}
