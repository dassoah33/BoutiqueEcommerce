'use strict'

const Utilisateur = use('App/Models/Utilisateur');
const bcrypt = require('bcryptjs');

class UtilisateurController {
  async signup({ request, response }) {
    const { nom, email, mot_de_passe, adresse, code_postal } = request.only(['nom', 'email', 'mot_de_passe', 'adresse', 'code_postal']);
    
    // Vérifier si l'utilisateur existe déjà
    const userExists = await Utilisateur.findOne({ email });
    if (userExists) {
      return response.status(400).send({ message: 'Un utilisateur avec cet email existe déjà.' });
    }
    
    // Créer le nouvel utilisateur
    const utilisateur = new Utilisateur({
      nom,
      email,
      mot_de_passe,
      adresse,
      code_postal
    });
    
    await utilisateur.save();
    
    return response.status(201).send({ message: 'Utilisateur créé avec succès' });
  }

  async login({ request, auth, response }) {
    const { email, mot_de_passe } = request.only(['email', 'mot_de_passe']);
    
    // Récupérer l'utilisateur par email
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return response.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    
    // Vérifier le mot de passe
    const passwordValid = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!passwordValid) {
      return response.status(400).send({ message: 'Mot de passe invalide' });
    }
    
    // Générer un JWT pour l'utilisateur
    const token = await auth.generate(utilisateur);
    
    return response.send({ message: 'Connexion réussie', token });
  }
}

module.exports = UtilisateurController;
