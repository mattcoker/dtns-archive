import Ember from 'ember';

export default Ember.Component.extend({
  router: Ember.inject.service('routing'),

  tagName: 'a',
  classNames: ['label', 'label-default'],
  classNameBindings: ['isPreview:massive','isPreview::hoverable'],

  name: Ember.computed.alias('model.name'),

  click() {
    this.get('router').transitionTo('pick.index', this.get('model'));
  }
});
