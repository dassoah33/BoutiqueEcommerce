'use strict'

const Article = use('App/Models/Article'); 

class ArticleController {
  async index({ response }) {
    const articles = await Article.find().select('-__v'); // Exclusion du champ __v
    return response.json(articles);
  }

  async show({ params, response }) {
    const article = await Article.findById(params.id).select('-__v'); // Exclusion du champ __v
    return response.json(article);
  }

  // Administration des articles 
  async store({ request, response }) {
    const articleData = request.only(['nom', 'description', 'prix', 'image', 'stock']);
    
    const article = await Article.create(articleData);
    return response.status(201).json(article);
  }

  async update({ params, request, response }) {
    const { id } = params;
    const updateData = request.only(['nom', 'description', 'prix', 'image', 'stock']);
    
    const article = await Article.findByIdAndUpdate(id, updateData, { new: true });
    return response.status(200).json(article);
  }

  async destroy({ params, response }) {
    const { id } = params;
    await Article.findByIdAndDelete(id);
    return response.status(200).send({ message: 'Article supprimé avec succès' });
  }

}

module.exports = ArticleController
