// routes/auth.js
const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
var nodemailer = require("nodemailer");
const multer = require("multer");
const Product = require("../models/ProductModel");
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: 'uploads/' })
const JWT_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
// Route pour l'enregistrement

// Middleware pour décoder le token
const decodeToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

router.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User Not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ status: "error", error: "Invalid Password" });
        }

        const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "15m",
        });

        return res.json({ status: "ok", data: { token, email: user.email, role: user.role, decodeToken: jwt.verify(token, JWT_SECRET), user:user} });
    } catch (error) {
        console.error(error);
        return res.json({ error: "Internal Server Error" });
    }
});
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: err.message });
        }

        req.user = decoded;
        next();
    });
};
router.get('/api/dashboard', authenticateUser, (req, res) => {
    const user = req.user;
    return res.json({ status: 'ok', data: { email: user.email, role: user.role } });
});



router.get('/all', async (req, res) => {
    const users = await User.find().exec();
    try {
        if(users.length !== 0) {
            res.send(users)
        }
        else {
            res.send({error:"pas de user"})
        }
    } catch(err){
        res.send({error:err.message})
    }


})
router.post('/api/image',upload.single('image'), (req, res) => {

    console.log(req.file )
    if(!req.file){
        res.json({code:500, msg: "err"})
    }
    else{
        req.file.filename = "1234"
        res.json({code:200, msg:'upload success'})
    }
})
router.post("/register",upload.single('imageProfile'), async (req, res) => {
    const { name, surname,
        // dateOfBirth,
        createdAt, email, password, role } = req.body;
    // // const [day, month, year] = dateOfBirth.split("-"); // Divisez la date par les tirets
    // const formattedDateOfBirth = new Date(`${year}-${month}-${day}`);
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ error: "User Exists" });
        }

        await User.create({
            name,
            surname,
            // dateOfBirth: formattedDateOfBirth,
            createdAt,
            imageProfile:req.file.filename,
            role,
            email,
            password: encryptedPassword,
        });
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: "error" + error.message });
    }
});
router.get('/imageProfileByID/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ code: 404, message: 'user non trouvé' });
        }

        // Récupérer le chemin complet de l'image
        const imagePath = path.join(__dirname, '../uploads', user.imageProfile);

        // Vérifier si le fichier image existe
        if (fs.existsSync(imagePath)) {
            // Renvoyer les données de l'image en tant que réponse
            res.sendFile(imagePath);
        } else {
            return res.status(404).json({ code: 404, message: 'Image non trouvée' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);
        res.status(500).json({ code: 500, message: error.message });
    }
});

router.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const useremail = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) { }
});
router.post("/forgot-password", async (req, res) => {

    const { email } = req.body;
    try {

        const oldUser = await User.findOne({ email });
        if (!oldUser) {

            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        console.log(secret)
        console.log(token)
        console.log(oldUser)

        const link = `http://localhost:5000/user/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'mounaamdouni213@gmail.com',
                pass: 'fkimduvzwfwvdfxn',
            },
        });

        var mailOptions = {
            from: 'mounaamdouni213@gmail.com',
            to: "mounaamdouni213@gmail.com",
            subject: "Password Reset",
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.json({ error: "error" });
            } else {
                console.log("Email sent: " + info.response);

                return res.json({ status: "ok", data: token });
            }
        });
        console.log(link);
    } catch (error) { }
});
router.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
        console.log(error);
        res.send("Not Verified");
    }
});

router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );

        res.json({ email: verify.email, status: "verified", id, token });
    } catch (error) {
        console.log(error);
        return res.json({ status: "error", message: "Token invalide ou expiré." });
    }
});



module.exports = router;
