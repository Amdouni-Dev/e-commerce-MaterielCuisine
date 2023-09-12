// orderRoutes.js

const asyncHandler=require('async-handler');
const Product=require('../models/ProductModel')
const User=require('../models/user')
const order=require('../models/orderModel')
const express=require('express');

const router = express.Router();
const stripe=require('stripe')
const Order = require("../models/orderModel");
// import stripe from 'stripe';
// import Product from "../Models/ProductModel.js";
// import productRouter from "./productRouter";

const stripeInstance = stripe('sk_test_51Mrh47EUjH7lozT7i8Ndfk88jh7XJTme9p8txs4O5yBVbwjUXTTfAAd5GraAkMNipehUMQksIZtA0B361HaLz6ff00Xk7m3v8h');

router.get("/", async (req, res) => {
    const orders = await Order.find().sort({'createdAt':-1})
        .populate('user')

    res.status(200).json(orders);
});

router.post('/addOrder', (async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            // itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,

            user
        } = req.body;
// if(!shippingAddress || !paymentMethod ||  !shippingPrice || !taxPrice || !totalPrice){
//     res.json({message:"donnees incompletes "})
// }
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        } else {
            const order = new Order({
                orderItems,
                shippingAddress,
                paymentMethod,
           //     itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,

                user,
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    })
);

// get Order by id
router.get(

    '/getOrderByID/:id',

    async (req, res) => {
try{
        const order =await Order.findById(req.params.id).populate(
            "user",
            "name email role"
        )



        if (order) {
            res.json(order)
        } else {


            res.status(404).json({message:"order not found"});
        }

        }catch(err){
    res.status(500).json({message:"erreur serveur"})
}


    }
);

// order is paid

// router.put(

//   '/:id/pay',

//   asyncHandler(async (req, res) => {

// const order =await Order.findById(req.params.id);



//     if (order) {
//       order.isPaid =true;
//       order.paidAt=Date.now;
//       order.payementRsult={
//         id:req.body.id,
//         status:req.body.status,
//         update_time:req.body.update_time,
//         email_address:req.body.email_address,
//       };
// const updatedOrder = await order.save()
// res.json(updatedOrder);
//     }
//     else {}




//       res.status(404);

//       throw new Error('Order not found')



//   })
// );
// router.put(
//   '/:id/pay',
//   asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now;
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       const updatedOrder = await order.save();

//       res.json(updatedOrder);
//     } else {
//       res.status(404);
//       throw new Error('Order not found');
//     }
//   })
// );
router.post('/create-payment-intent', asyncHandler(async (req, res) => {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        res.json({ client_secret: paymentIntent.client_secret });
    }));


// get order by user
router.get('/getOrder/Byuser/:id',asyncHandler(async (req, res) => {

    const order = await Order.find({user: req.user.id}).sort({id:-1});
    res.json(order);

}));

router.put('/:id/pay', async (req, res) => {


    try{
        const order = await Order.findById(req.params.id);
        if (order) {
        const amount = order.totalPrice;
        console.log("test pay order")
    console.log(amount)
        const amountInCents = Math.round(amount * 100);
        if (amount <= 0) {
            res.status(400);
            throw new Error('Invalid amount');
        }

            const paymentIntent = await stripeInstance.paymentIntents.create({
                amount: amountInCents,
                currency: 'usd',
                metadata: {
                    integration_check: 'accept_a_payment',
                    order_id: order._id.toString()
                }
            });

            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: paymentIntent.id,
                status: paymentIntent.status,
                update_time: paymentIntent.created,
                email_address: req.body.email_address
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    }catch(err) {
        console.error(err.message);
    }}


);



router.get('/ordersByUser/:userId/orders', async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (err) {
        console.error(`Erreur lors de la récupération des commandes de l'utilisateur ${req.params.userId}: ${err}`);
        res.status(500).send('Erreur serveur');
    }
});


router.delete("/:id",async (req,res)=>{
        const order=await Order.findById(req.params.id);

        if(order){
            await order.remove()
            res.json({message:"order removed"});

        }else{
            res.status(404);
            throw new Error("order not found");

        }


    })



module.exports= router;
