import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  settings: storageFor('settings'),
  peopleShowGrid:   Ember.computed.alias('settings.peopleShowGrid'),
  episodesShowGrid: Ember.computed.alias('settings.episodesShowGrid'),
  picksShowGrid:   Ember.computed.alias('settings.picksShowGrid'),
  topicsShowGrid:   Ember.computed.alias('settings.topicsShowGrid'),
  globalDateFormat: Ember.computed.alias('settings.globalDateFormat'),
  globalTimeFormat: Ember.computed.alias('settings.globalTimeFormat'),

  currDate: new Date(),

  dateFormats: ['MMMM DD, YYYY', 'YYYY-MM-DD', 'MM/DD/YY', 'DD/MM/YY',],

  timeFormats: [
    { value: 'HH:mm', label: 'HH:MM (24-hour)' },
    { value: 'h:mm a', label: 'HH:MM (12-hour)' },
  ],

  actions: {
    updateDateFormat(arg) {
      this.set('globalDateFormat', arg);
    },

    updateTimeFormat(arg) {
      this.set('globalTimeFormat', arg);
    },

    switchEpisodesLayout(arg) {
      this.set('episodesShowGrid', (arg === 'grid'));
    },

    switchPeopleLayout(arg) {
      this.set('peopleShowGrid', (arg === 'grid'));
    },

    switchPicksLayout(arg) {
      this.set('picksShowGrid', (arg === 'grid'));
    },

    switchTopicsLayout(arg) {
      this.set('topicsShowGrid', (arg === 'grid'));
    }
  }
});
