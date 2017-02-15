import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  settings: storageFor('settings'),

  classNames: ['card', 'has-footer']
});
