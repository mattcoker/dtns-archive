import Ember from 'ember';
import moment from 'moment';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  settings: storageFor('settings'),

  dateFormat: Ember.computed.alias('settings.globalDateFormat'),

  sortingKey:['episodeNumber:desc'],
  sortedModel: Ember.computed.sort('episodes', 'sortingKey'),

  filterField: 'allText',
  filterTerm: '',
  filterFields: [
    { label: 'All fields', value: 'allText' },
    { label: 'Episode Number', value: 'episodeNumber' },
    { label: 'Episode Name', value: 'episodeName' },
    { label: 'Description', value: 'description' },
    { label: 'Air Date', value: 'airDate' },
  ],

  filteredEpisodes: Ember.computed('sortedModel.@each', 'filterTerm', 'filterField', function() {
    const episodes = this.get('sortedModel');
    let filterTerm = this.get('filterTerm');
    let filterField = this.get('filterField');

    if (Ember.isBlank(filterTerm)) { return episodes; }
    filterTerm = filterTerm.toLowerCase();
    return episodes.filter((episode) => {
      const dateFormat = this.get('dateFormat');
      let targetValue = episode.get(filterField);

      if (Ember.typeOf(targetValue) === 'date') {
        targetValue = moment(targetValue).format(dateFormat);
      }
      return (targetValue.toLowerCase().indexOf(filterTerm) > -1);
    });
  }),

  updateFilterFieldFn: function(filterField) {
    this.set('showLoadingState', false);
    this.set('filterField', filterField);
  },

  updateFilterTermFn: function(filterTerm) {
    this.set('showLoadingState', false);
    this.set('filterTerm', filterTerm);
  },

  actions: {
    updateFilterField(arg) {
      this.set('showLoadingState', true);
      Ember.run.debounce(this, this.updateFilterFieldFn, arg,  500);
    },

    updateFilterTerm(arg) {
      this.set('showLoadingState', true);
      Ember.run.debounce(this, this.updateFilterTermFn, arg,  500);
    }
  }

});
