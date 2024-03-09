const mongoose = require("mongoose");
const validator = require("validator");
const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if (value.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
        }
    },
    contact: {
        type: Number,
        required: true,
        validate(value) {
            if (!validator.isNumeric(value.toString())) {
                throw new Error('Contact must be a numeric value');
            }
            if ((value.toString()).length != 10) {
                throw new Error('Contact should be of 10 length');
            }
        }
    },
    gstno: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length !== 15) {
                throw new Error('GST number must be exactly 15 characters long');
            }
        }
    }
});
const OrganizaitonModel=mongoose.model("Organization",OrganizationSchema)
module.exports=OrganizaitonModel