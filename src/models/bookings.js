const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    bill: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
    },
    ph: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    adv: {
        type: Number,
        required: true
    },
    rem: {
        type: Number,
        required: true
    }
})



const Bookings = new mongoose.model("bookingregisters", bookingSchema);

module.exports = Bookings