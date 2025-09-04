const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchem=new mongoose.Schema({
    username: {
        type: String,       
        required: true,
        unique: true,
        trim: true

    },
    email: {
        type: String,       
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
   
})

userSchem.pre('save', async function (next) {
    if (!this.isModified('password')) return next();        
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }   
});

const usermodel=mongoose.model('User',userSchem);







module.exports=usermodel;

