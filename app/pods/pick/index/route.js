import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: Ember.computed('controller.model.name', function() {
    return this.controller.get('model.name');
  }),

  model() {
    const pickId = this.paramsFor('pick').pick_id;
    return this.get('store').findRecord('pick', pickId);
  }
});
