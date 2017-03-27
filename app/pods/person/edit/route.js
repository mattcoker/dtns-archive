import Ember from 'ember';
import AuthRedirectMixin from '../../../mixins/auth-redirect';

export default Ember.Route.extend(AuthRedirectMixin, {

  titleToken: Ember.computed('controller.model.fullName', function() {
    return `Editing ${this.controller.get('model.fullName')}`;
  }),

  model() {
    const personId = this.paramsFor('person').person_id;
    return this.get('store')
      .findRecord('person', personId)
      .catch(() => {
        // Model not found, redirect to people list
        this.transitionTo('people.index');
      });
  },

  actions: {
    savePerson(person) {
      const currDate = new Date();
      person.set('updatedAt', currDate);

      person.save().then(() => {
        this.transitionTo('person.index', person);
      });
    },

    cancelPerson(person) {
      person.rollbackAttributes();
      this.transitionTo('person.index', person);
    },

    willTransition(transition) {
      const person = this.controller.get('model');
      if (person && person.get('hasDirtyAttributes')) {
        const confirmMessage = 'Any changes you have made will not be saved. Are you sure?';
        if (confirm(confirmMessage)) {
          person.rollbackAttributes();
          return true;
        }
        transition.abort();
      }
    }
  }
});
