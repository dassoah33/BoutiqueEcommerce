'use strict';

const mongoose = use('Mongoose');
const Schema = mongoose.Schema;

let commandeSchema = new Schema({
  utilisateur_id: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  total: Number,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);
