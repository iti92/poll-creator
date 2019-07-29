'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    name: String,
    questionBlocks: [],
}, { strict: false });



// export Word model.
module.exports = mongoose.model('Page', pageSchema);
