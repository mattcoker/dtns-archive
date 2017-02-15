import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'People',

  model() {
    return this.get('store').query('person', {
      orderBy: 'lastName'
    });
  },

  setupController(controller, model) {
    controller.set('people', model);
  }
});
