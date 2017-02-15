import Ember from 'ember';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  tagName: 'div',
  classNames: ['card', 'topic-card'],
  styleBindings: ['borderColor:border-color'],

  backgroundColor: Ember.computed.alias('model.backgroundColor'),
  textColor: Ember.computed.alias('model.textColor'),

  borderColor: Ember.computed('backgroundColor', function() {
    return `${this.get('backgroundColor')}`;
  })
});
