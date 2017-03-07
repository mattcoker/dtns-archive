import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

export default Ember.Component.extend(InViewportMixin, {
  tagName: 'p',
  classNames: ['content-trigger'],

  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    this.set('viewportSpy', true);
  }),

  didEnterViewport() {
    this.sendAction('updateContent');
  }
});
