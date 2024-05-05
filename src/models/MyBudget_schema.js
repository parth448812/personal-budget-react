//import { Schema, model } from 'mongoose';

const mongoose = require('mongoose');


const myBudgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^#([0-9A-Fa-f]{6})$/.test(v);
            },
            message: 'Color must be in the hexadecimal format.'
        }
    }
}, { collection: 'MyBudget' });

// export default model('MyBudget', myBudgetSchema)
 module.exports = mongoose.model("MyBudget", myBudgetSchema);;