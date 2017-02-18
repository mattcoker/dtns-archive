import Ember from 'ember';
import AuthRedirectMixin from '../../../mixins/auth-redirect';

export default Ember.Route.extend(AuthRedirectMixin, {
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
