const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const geneticraftuserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        default: 15 
    }
}, 
{
    timestamps: true
})

geneticraftuserSchema.methods.deductCredits = async function (amount) {
    if (this.credits >= amount) {
        this.credits -= amount;
        await this.save();
        return true; 
    } else {
        return false;
    }
};

geneticraftuserSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    }, process.env.JWT)
    return token
}

const GenetiCraftUser = mongoose.model('GenetiCraftUser', geneticraftuserSchema);

module.exports = GenetiCraftUser;