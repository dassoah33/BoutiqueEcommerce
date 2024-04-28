'use strict';

const mongoose = use('Mongoose');
const Schema = mongoose.Schema;

let panierSchema = new Schema({
  utilisateur_id: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
  articles: [{
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    quantite: Number
  }],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Panier', panierSchema);
