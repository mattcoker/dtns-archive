import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Controller.extend({
  settings: storageFor('settings'),

  filterField: 'allText',
  filterTerm: '',
  filterFields: [
    { label: 'All fields', value: 'allText' },
    { label: 'Full Name', value: 'fullName' },
    { label: 'Title/Role', value: 'title' },
    { label: 'Description', value: 'description' },
    { label: 'Twitter Username', value: 'twitterHandle' },
  ],

  filteredPeople: Ember.computed('people', 'filterTerm', 'filterField', function() {
    const people = this.get('people');
    let filterTerm = this.get('filterTerm');
    let filterField = this.get('filterField');

    if (Ember.isBlank(filterTerm)) { return people; }

    filterTerm = filterTerm.toLowerCase();
    return people.filter((person) => {
      return (person.get(filterField).toLowerCase().indexOf(filterTerm) > -1);
    });
  }),

  actions: {
    updateFilterField(arg) {
      this.set('filterField', arg);
    },
  }
});
