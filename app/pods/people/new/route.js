import Ember from 'ember';
import AuthRedirectMixin from '../../../mixins/auth-redirect';

export default Ember.Route.extend(AuthRedirectMixin, {
  stats: Ember.inject.service(),

  titleToken: 'Add New Person',

  model() {
    return this.get('store').createRecord('person', {});
  },

  setupController(controller, model) {
    controller.set('person', model);
  },

  actions: {
    savePerson(person) {
      person.save().then(() => {
        this.transitionTo('people');
      }).catch((err) => {
        console.log(err);
      });
    }
  }
});
