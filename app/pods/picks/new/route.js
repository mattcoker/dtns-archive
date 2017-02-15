import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Add New Pick',

  model() {
    return this.get('store').createRecord('pick', {});
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('pick', model);
  },

  actions: {
    savePick(pick) {
      pick.save().then(() => {
        this.transitionTo('picks.index');
      });
    }
  }
});
