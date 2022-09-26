const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'https://th.bing.com/th/id/R.dfead413848e4732e81b168ba7b2af2c?rik=YgM6I7anaJ7e%2bA&pid=ImgRaw&r=0'
    },
    role: {type: String, default: 'user'},
    gender: {type: String, default: 'male'},
    yearsOld: {type: String, default: ''},
    city: {type: String, default: ''},
    
    followers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    rf_token: { type: String, select: false }
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)