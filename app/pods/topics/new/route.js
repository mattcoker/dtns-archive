import Ember from 'ember';
import AuthRedirectMixin from '../../../mixins/auth-redirect';

export default Ember.Route.extend(AuthRedirectMixin, {
  titleToken: 'Add New Topic',

  model() {
    return this.get('store').createRecord('topic', {});
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('topic', model);
  },

  actions: {
    saveTopic(topic) {
      topic.set('slug', topic.get('name').dasherize());
      topic.save().then(() => {
        this.transitionTo('topics.index');
      });
    }
  }
});
