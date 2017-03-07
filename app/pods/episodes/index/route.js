import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Episodes',

  model() {
    return this.get('store').query('episode', { orderBy: 'episodeNumber' });
  },

  setupController(controller, model) {
    controller.set('episodes', model);
  }
});
