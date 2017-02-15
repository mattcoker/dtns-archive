import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: '',

  model() {
    const personId = this.paramsFor('person').person_id;
    return this.get('store').findRecord('person', personId);
  },

  afterModel(model) {
    this.set('titleToken', model.get('fullName'));
  }
});
