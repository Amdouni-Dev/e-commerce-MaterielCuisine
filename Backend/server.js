const express = require('express');
const User= require("./models/user");
const Product =require("./models/ProductModel")
const app = express();
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = 5000;
const userRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productRouter')
const categoryRouter = require('./routes/categoryRouter')
const orderRouter =require('./routes/orderRoutes')
require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./db.json");
const path = require('path');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI || db.mongo.uri, {useNewUrlParser: true})
    .then(()=> { console.log("connected to DB") })
    .catch((err)=>{ console.log(err.message) });
app.get('/user', userRouter)
// app.get('/pp',productRouter)

app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/order',orderRouter)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/testProduct/imageProductByID', express.static(path.join(__dirname, 'uploads')));


app.use('/user', userRouter);
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
