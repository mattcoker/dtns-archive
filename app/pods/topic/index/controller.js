import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  settings: storageFor('settings'),

  playerVars: {
    autoplay: 0,
    showinfo: 0,
    controls: 0,
    fs: 0,
    modestbranding: 1,
    iv_load_policy: 3
  },

  dateFormat: Ember.computed.alias('settings.globalDateFormat')
});
