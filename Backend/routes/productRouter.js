const express = require('express')
const productRouter=express.Router()
const Product=require('../models/ProductModel')
const User=require('../models/user')
const Category=require('../models/CategoryModel')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path');
productRouter.get('/testProduct', (req, res)=>{
    res.send("Good Mouna , bien testé ")
})
productRouter.post('/api/image',upload.single('image'), (req, res) => {

    console.log(req.file )
    if(!req.file){
        res.json({code:500, msg: "err"})
    }
    else{
        req.file.filename = "1234"
        res.json({code:200, msg:'upload success'})
    }
})
productRouter.post('/addProduct/:idUser', upload.single('image'), async (req, res) => {
    const { name, description,
price,
        countInStock,
        categoryID
    } = req.body;

    try {
        const userM = await User.findById(req.params.idUser);
        if (!userM) {
            return res.json({ status: "user not found" });
        }

        const category = await Category.findById(categoryID);
        if (!category) {
            return res.json({ status: "error " + "category not found" });
        }

        const newProduct = await Product.create({
            name: name,
            description: description,
            user: userM,
            price:price,
            countInStock:countInStock,
            image: req.file.filename,
            category: category
        });
console.log("###########################")
        console.log("###########################")

       return  res.json(newProduct);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: err.message });
    }
});

const fs = require('fs'); // Require the 'fs' module for file handling

productRouter.get('/imageProductByID/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ code: 404, message: 'Produit non trouvé' });
        }

        // Récupérer le chemin complet de l'image
        const imagePath = path.join(__dirname, '../uploads', product.image);

        // Vérifier si le fichier image existe
        if (fs.existsSync(imagePath)) {
            // Renvoyer les données de l'image en tant que réponse
            res.sendFile(imagePath);
        } else {
            return res.status(404).json({ code: 404, message: 'Image non trouvée' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);
        res.status(500).json({ code: 500, message: 'Erreur serveur' });
    }
});

productRouter.get('/allProducts', async (req, res) => {
    try {
        const products = await Product.find()
            .populate('user'); // Utilisez populate() sans spécifier de champs pour récupérer toutes les données de l'utilisateur associé à chaque produit

        // Récupérez les informations de l'utilisateur pour chaque produit
        const productsWithUser = await Promise.all(products.map(async product => {
            const user = await User.findById(product.user);
            const category=await Category.findById(product.category)


            return {
                ...product.toObject(),
                user
            };
        }));

        res.json(productsWithUser);
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
});






productRouter.delete('/deleteProduct/:id', async (req, res) => {


    try{
        const id=req.params.id;
        const product=await Product.findById(id);
        if(!product){
            res.json({status: "Product not found"})
        }
       await  Product.remove(product)
        res.json({status: "success"})
    }
    catch(err) {
      res.json({status: "error"})
    }
})
productRouter.put('/updateProduct/:id', async (req, res) => {
    const id=req.params.id
    const {name, price,description,countInStock}=req.body;
    try {
        const product=await Product.findById(id)

        if (!product){
            res.json({status:"product not found"})

        }
      product.name=name
        product.price=price
        product.description=description
        product.countInStock=countInStock

       const newProduct=await product.save()
        res.json(newProduct)
    }catch(err) {
res.json({status:"error"+err.message})
    }

})
productRouter.get('/getProductsByUser/:idUser', async (req, res) => {
    const id = req.params.idUser;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.json({ status: "user not found" });
        }
        const products = await Product.find({ user: user._id }); // Utilisez 'user._id' pour faire correspondre l'ID de l'utilisateur dans la base de données
        res.json(products);
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
});
module.exports= productRouter;
