import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['card'],
  classNameBindings: ['backgroundIcon'],

  backgroundIcon: Ember.computed('model.category', function() {
    console.log(this.get('model.category').dasherize());
    return 'pick-category-' + this.get('model.category').dasherize().replace('/', '-').replace('.', '');
  })
});
