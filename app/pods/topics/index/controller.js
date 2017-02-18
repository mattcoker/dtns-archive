import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  settings: storageFor('settings'),

  filterField: 'allText',
  filterTerm: '',
  filterFields: [
    { label: 'All fields', value: 'allText' },
    { label: 'Name', value: 'name' },
    { label: 'Description', value: 'description' },
  ],

  filteredTopics: Ember.computed('model', 'filterTerm', 'filterField', function() {
    const topics = this.get('model');
    let filterTerm = this.get('filterTerm');
    let filterField = this.get('filterField');

    if (Ember.isBlank(filterTerm)) { return topics; }

    filterTerm = filterTerm.toLowerCase();
    return topics.filter((topic) => {
      return (topic.get(filterField).toLowerCase().indexOf(filterTerm) > -1);
    });
  }),

  actions: {
    updateFilterField(arg) {
      this.set('filterField', arg);
    },
  }
});
