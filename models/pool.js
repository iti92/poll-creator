'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poolSchema = new Schema({
    name: String,
    answers: [],
}, { strict: false });



// export Word model.
module.exports = mongoose.model('Pool', poolSchema);