'use strict'

const Panier = use('App/Models/Panier');
const Article = use('App/Models/Article');

class PanierController {
  
  async index({ auth, response }) {
    const user = await auth.getUser();
    let panier = await Panier.findOne({ utilisateur_id: user._id }).populate('articles.article');
    
    if (!panier) {
      panier = await new Panier({ utilisateur_id: user._id, articles: [] }).save();
    }

    return response.json(panier);
  }

  async store({ auth, request, response }) {
    const user = await auth.getUser();
    const { articleId, quantite } = request.all();

    let panier = await Panier.findOne({ utilisateur_id: user._id });
    if (!panier) {
      panier = new Panier({ utilisateur_id: user._id, articles: [] });
    }

    // Vérifier si l'article existe déjà dans le panier
    const articleIndex = panier.articles.findIndex(item => item.article.equals(articleId));
    if (articleIndex > -1) {
      panier.articles[articleIndex].quantite += quantite;
    } else {
      // Vérifier si l'article existe
      const article = await Article.findById(articleId);
      if (!article) {
        return response.status(404).json({ message: 'Article non trouvé' });
      }
      panier.articles.push({ article: article._id, quantite });
    }
    
    await panier.save();
    
    return response.status(201).json(panier);
  }

}

module.exports = PanierController;
