



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const roles=['user','client','admin','ServiceClient','vendeur','Moderateur']
const userSchema = new mongoose.Schema({
    name: {
        type: String,
         required: [true, "Pleaser add your name"],
    },
    surname: {
        type: String,
        required: [true, "Pleaser add surname"],
    },
    dateOfBirth: { type: Date,
       // required:[true, "Please enter your birth Date "]
    },
    imageProfile:{
        type:String
    },
    createdAt: { type: Date, default: Date.now },
    pendingDeletion: {
        // variable boolean bech tebe3 tafsikh l compte
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: roles,
        default: "user",
        validate: {
            validator: function(value) {
                return roles.includes(value);
            },
            message: props => `${props.value} is not a valid role`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
        city: { type: String, 'default': '' },
        coordinate: {
            lat: { type: Number, 'default': 0 },
            lng: { type: Number, 'default': 0 }
        },
},
    {
        timestamps: true,
    }
    );



const User = mongoose.model("User", userSchema);
module.exports = User;
