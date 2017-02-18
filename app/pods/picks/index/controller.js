import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  settings: storageFor('settings'),

  actions: {
    updateFilterField(arg) {
      this.set('filterField', arg);
    },
  }
});
