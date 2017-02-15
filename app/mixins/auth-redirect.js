// This is a route mixin, and should not be added to any controllers
import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service(),

  beforeModel(transition) {
    this._super(...arguments);
    if (!this.get('session.isAuthenticated')) {
      this.controllerFor('login').set('previousTransition', transition);
      this.transitionTo('login');
    }
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('protectedRoute', true);
  }
});
