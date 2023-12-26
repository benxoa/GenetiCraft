const mongoose = require('mongoose');

const geneticraftcontactSchema =new mongoose.Schema({

    email: {
        type: String,
        required: true,

    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    }
}, 
{
    timestamps: true
})



const GenetiCraftContact = mongoose.model('GenetiCraftContact', geneticraftcontactSchema);

module.exports = GenetiCraftContact;