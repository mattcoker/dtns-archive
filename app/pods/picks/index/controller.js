import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  settings: storageFor('settings'),

  filterField: 'allText',
  filterTerm: '',
  filterFields: [
    { label: 'All fields', value: 'allText' },
    { label: 'Name', value: 'name' },
    { label: 'Category', value: 'category' },
    { label: 'Description', value: 'description' },
  ],

  filteredPicks: Ember.computed('model', 'filterTerm', 'filterField', function() {
    const picks = this.get('model');
    let filterTerm = this.get('filterTerm');
    let filterField = this.get('filterField');

    if (Ember.isBlank(filterTerm)) { return picks; }

    filterTerm = filterTerm.toLowerCase();
    return picks.filter((pick) => {
      return (pick.get(filterField).toLowerCase().indexOf(filterTerm) > -1);
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

  // actions: {
  //   updateFilterField(arg) {
  //     this.set('filterField', arg);
  //   },
  // }
});
