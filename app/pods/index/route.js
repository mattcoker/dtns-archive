import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Homepage',

  model() {
    return this.get('store').query('episode', {
      orderBy: 'airDate',
      limitToLast: 4
    });
  },

  setupController(controller, model) {
    controller.set('latestEpisodes', model.toArray().reverse());
  }
});
