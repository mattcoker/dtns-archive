import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  showMatches: Ember.computed('fieldName', 'filterTerm', 'filterField', function() {
    const { fieldName, filterField } = this.getProperties('fieldName', 'filterField');
    return (filterField === fieldName) || (filterField === 'allText');
  })
});
