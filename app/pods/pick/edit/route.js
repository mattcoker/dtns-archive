import Ember from 'ember';
import AuthRedirectMixin from '../../../mixins/auth-redirect';

export default Ember.Route.extend(AuthRedirectMixin, {
  titleToken: Ember.computed('controller.model.name', function() {
    return `Editing ${this.controller.get('model.name')}`;
  }),

  model() {
    const pickId = this.paramsFor('pick').pick_id;
    return this.get('store').findRecord('pick', pickId);
  },

  actions: {
    savePick(pick) {
      pick.set('updatedAt', new Date());
      pick.save().then(() => {
        this.transitionTo('pick.index', pick);
      });
    },

    cancelPick(pick) {
      pick.rollbackAttributes();
      this.transitionTo('pick.index', pick);
    }
  }
});
