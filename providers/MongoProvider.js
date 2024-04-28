'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const mongoose = require('mongoose');

class MongoProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  async boot() {
    const dbURI = Env.get('MONGO_DB_URI', 'mongodb://localhost:27017/boutiqueFachaven');
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('Connected to MongoDB');
    });
  }

}

module.exports = MongoProvider
