'use strict';

const mongoose = use('Mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

let utilisateurSchema = new Schema({
  nom: String,
  email: { type: String, unique: true },
  mot_de_passe: String,
  adresse: String,
  code_postal: String,
  panier: [{ type: Schema.Types.ObjectId, ref: 'Panier' }],
  commande: [{ type: Schema.Types.ObjectId, ref: 'Commande' }]
}, { timestamps: true });

// Hacher le mot de passe avant de sauvegarder le modèle Utilisateur
utilisateurSchema.pre('save', async function (next) {
  if (!this.isModified('mot_de_passe')) {
    return next();
  }
  this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, 10);
  next();
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
