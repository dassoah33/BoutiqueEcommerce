'use strict';

const mongoose = use('Mongoose');

let articleSchema = mongoose.Schema({
  nom: String,
  description: String,
  prix: Number,
  image: String,
  stock: Number
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
