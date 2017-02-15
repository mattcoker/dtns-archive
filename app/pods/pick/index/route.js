import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: '',

  model() {
    const pickId = this.paramsFor('pick').pick_id;
    return this.get('store').findRecord('pick', pickId);
  },

  afterModel(model) {
    this.set('titleToken', model.get('name'));
  }
});
