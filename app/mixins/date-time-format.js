import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Mixin.create({
  settings: storageFor('settings'),

  dateFormat: Ember.computed.alias('settings.globalDateFormat'),

  timeFormat: Ember.computed.alias('settings.globalTimeFormat'),

  dateTimeFormat: Ember.computed('settings.globalDateFormat', 'settings.globalTimeFormat', function() {
    const gDF = this.get('settings.globalDateFormat');
    const gTF = this.get('settings.globalTimeFormat');
    return `${gDF} [at] ${gTF}`;
  }),
});
