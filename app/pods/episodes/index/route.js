import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Episodes',

  model() {
    const store = this.get('store');
    return store.findAll('person').then(() => {
      return store.query('episode', { orderBy: 'episodeNumber' });
    });
  },

  setupController(controller, model) {
    controller.set('episodes', model);
  }
});
