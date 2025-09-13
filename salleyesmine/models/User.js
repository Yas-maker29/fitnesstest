const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  sexe: String,
  taille: Number,
  poids: Number,
  poidsIdeal: Number,
  conseil: String,
  reponses: [String], 
  conclusion: String
});

module.exports = mongoose.model('User', userSchema);
