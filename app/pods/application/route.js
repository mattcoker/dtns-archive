import Ember from 'ember';
import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';

export default TransitionToListenerRoute.extend({
  intl: Ember.inject.service(),
  stats: Ember.inject.service(),

  init() {
    this._super(...arguments);

    // Services are lazy-loaded. In order to trigger the stats service to
    // initialize, we must access the service
    this.get('stats');
  },

  beforeModel() {
    this._super(...arguments);
    return this.get('session').fetch().catch(function() {});
  },

  afterModel() {
    this._super(...arguments);
    return this.get('intl').setLocale('en-us');
  },

  title(tokens) {
    return tokens.join(' - ') + ' - Daily Tech News Show Archives';
  },

  actions: {
    logoutUser() {
      this.get('session').close();
      this.transitionTo('index');
    },

    willTransition() {
      // Collapse bootstrap menu on route transition
      this.set('controller.menuCollapsed', true);
    }
  }
});
