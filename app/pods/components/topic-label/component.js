import Ember from 'ember';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  router: Ember.inject.service('routing'),

  tagName: 'span',
  classNames: ['badge', 'badge-pill'],
  classNameBindings: ['isPreview:preview:hoverable'],
  styleBindings: ['backgroundColor:background-color','textColor:color'],

  isPreview: false,

  backgroundColor: Ember.computed.alias('model.backgroundColor'),
  textColor: Ember.computed.alias('model.textColor'),

  name: Ember.computed('model.name', function() {
    const topicName = this.get('model.name');
    return (topicName) ? topicName : 'Topic Name';
  }),

  click() {
    if (!this.get('isPreview')) {
      this.get('router').transitionTo('topic.index', this.get('model.slug'));
    }
  }
});
