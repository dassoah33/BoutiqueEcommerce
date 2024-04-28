'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('articles', 'ArticleController.index')
  Route.get('articles/:id', 'ArticleController.show')
  // ... autres routes pour ArticleController
}).prefix('api')


// Pour créer un nouvel article (supposons qu'il y ait une authentification et une autorisation)
Route.post('articles', 'ArticleController.store').middleware(['auth'])

// Pour mettre à jour un article
Route.patch('articles/:id', 'ArticleController.update').middleware(['auth'])

// Pour supprimer un article
Route.delete('articles/:id', 'ArticleController.destroy').middleware(['auth'])

// Routes pour le panier
Route.get('/panier', 'PanierController.index').middleware(['auth']);
Route.post('/panier', 'PanierController.store').middleware(['auth']);

// Commande
Route.post('/commandes', 'CommandeController.store').middleware(['auth']);
