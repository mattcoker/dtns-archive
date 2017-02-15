import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: '',

  model() {
    const episodeId = this.paramsFor('episode').episode_id;
    return this.get('store').findRecord('episode', episodeId);
  },

  afterModel(model) {
    this.set('titleToken', model.get('displayName'));
  }
});
