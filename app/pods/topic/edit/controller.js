import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveTopic(model) {
      return true;
    },

    cancelTopic(model) {
      return true;
    }
  }
});
