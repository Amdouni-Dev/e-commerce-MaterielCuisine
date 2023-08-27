const express = require('express')
const categoryRouter=express.Router()
const Category=require('../models/CategoryModel')



categoryRouter.post('/addCategory',async (req, res)=>{
    const {name}=req.body;

    try{



        const newCategory= await Category.create({name:name})
        res.json(newCategory)

    }catch (err){
        res.json({status:"error"+err.message})
    }
})
categoryRouter.get('/getCategoryById/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cat = await Category.findById(id); // Utilisation de await pour attendre la réponse
        if (!cat) {
            res.status(404).json({ message: "Category not found" }); // Utilisation de status(404) pour indiquer que la ressource n'a pas été trouvée
        } else {
            res.json({ cat });
        }
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message }); // Utilisation de status(500) pour indiquer une erreur interne du serveur
    }
});
categoryRouter.get('/allCategories', async (req, res) => {
    try {
        const categories = await Category.find()



        res.json(categories);
    } catch (err) {
        res.json({ status: "error", message: err.message });
    }
});
categoryRouter.delete('/deleteCategory/:id', async (req, res) => {


    try{
        const id=req.params.id;
        const category=await Category.findById(id);
        if(!category){
            res.json({status: "Category not found"})
        }
        await  Category.remove(category);
        res.json({status: "success"})
    }
    catch(err) {
        res.json({status: "error"})
    }
})
categoryRouter.put('/updateCategory/:id', async (req, res) => {
    const id=req.params.id
    const {name}=req.body;
    try {
        const category=await Category.findById(id)

        if (!category){
            res.json({status:"category not found"})

        }
        category.name=name


        const newCategory=await category.save()
        res.json(newCategory)
    }catch(err) {
        res.json({status:"error"+err.message})
    }

})
module.exports= categoryRouter;
