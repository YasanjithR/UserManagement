const express = require('express');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        
    },

    lastname: {
        type: String,
        required: true,
        
    },

    email :{
        type: String,
        required: true,
        unique: true
    },

    password :{
        type: String,
        required: true,

    },

    createdDate: {
        type: Date,
        default: Date.now
    },

    lastUpdateDate:{
        type: Date,
        default: Date.now
    }


})


module.exports = mongoose.model('User', userSchema);