const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    certificateType: {
        type: String,
        required: true,
        trim: true
    },
    certificateId: {
        type: String,
        required: true,
        trim: true
    }
});

const CertificateModel = mongoose.model("Certificate", CertificateSchema);

module.exports = CertificateModel;