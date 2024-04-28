'use strict'

const Commande = use('App/Models/Commande');
const Panier = use('App/Models/Panier');

class CommandeController {
  
  async store({ auth, response }) {
    const user = await auth.getUser();
    const panier = await Panier.findOne({ utilisateur_id: user._id }).populate('articles.article');

    if (!panier || panier.articles.length === 0) {
      return response.status(400).json({ message: 'Le panier est vide' });
    }

    // Calculer le total de la commande
    let total = 0;
    for (let item of panier.articles) {
      total += (item.quantite * item.article.prix);
    }

    // Créer la commande
    const commande = new Commande({
      utilisateur_id: user._id,
      articles: panier.articles.map(item => ({
        article: item.article._id,
        quantite: item.quantite,
        prix: item.article.prix
      })),
      total: total
    });

    await commande.save();

    // Vider le panier
  }

}