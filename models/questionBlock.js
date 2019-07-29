'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionBlock = new Schema({
  name: String,
  type: String,
  options:[],
  label: [],
  page:String,
}, { strict: false });



// export Word model.
module.exports = mongoose.model('Question', questionBlock);
