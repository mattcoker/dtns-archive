import Ember from 'ember';

export default Ember.Controller.extend({
  menuCollapsed: true,

  actions: {
    logoutUser() {
      return true;
    }
  }
});
