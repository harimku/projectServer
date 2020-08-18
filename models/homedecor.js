const mongoose = require('mongoose');
const Schema = mongoose.Schema;  //using shorthand

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Create a schema
const homedecorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, {  //second, optional argument for configuration options
    timestamps: true
});

// Create a model using the schema
const Homedecor = mongoose.model('Homedecor', homedecorSchema); //mongoose.model() returns a constructor function

module.exports = Homedecor;