import Ember from 'ember';

export default Ember.Route.extend({
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
      topic.save().then(() => {
        this.transitionTo('topics.index');
      });
    }
  }
});
