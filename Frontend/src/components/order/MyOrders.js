import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
const MyOrders=()=>{
    const param=useParams()
    const[userID,setUserID] = useState(null)
    const [orders,setOrders] = useState(null)
    useEffect( ()=>{
        console.log("***********My Orders********")
        console.log(param.userID)
        setUserID(param.userId)

    } )
    const getOrdersByUJserID=async () => {
        const res = await axios.get(`http://localhost:5000/order/ordersByUser/${userID}/orders`)
        setOrders(res.data)
    }
    useEffect( ()=>{
        getOrdersByUJserID()
    },[userID] )
    return(
        <div>


            <div className="table-responsive" >
                <table className="table" >
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>STATUS</th>

                        <th>DATE</th>

                        <th>TOTAL</th>

                    </tr>

                    </thead>
                    <tbody>

                    {orders &&
                        orders.map( (order)=>(

                            <tr className={`${order.isPaid ? "alert-success" :"alert-danger" }`} key={order._id} >

                                <td>
                                    <a href={`/Order/${order._id}`} className="link" >{order._id}</a>
                                </td>
                                <td>{order.isPaid ? <>Paid</>:<>Not Paid</> }</td>
                                <td>{order.isPaid
                                    ?moment  (order.paidAt).calendar():
                                    moment    (order.createdAt).calendar()
                                }</td>
                                <td> {order.totalPrice} DT </td>


                            </tr>

                        ) )
                    }

                    </tbody>


                </table>


            </div>)


        </div>
    )
}
export default MyOrders
