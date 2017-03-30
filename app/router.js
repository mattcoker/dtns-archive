import Ember from 'ember';
import RouterScroll from 'ember-router-scroll';

const Router = Ember.Router.extend(RouterScroll, {
  metrics: Ember.inject.service(),

  location: 'router-scroll',
  historySupportMiddleware: true,

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('settings');

  // Episode model routes
  this.route('episodes', function() {
    // Temporarily disable episode creation
    // this.route('new');
  });

  this.route('episode', { path: '/episode/:episode_id' }, function() {
    this.route('edit', { path: '/edit' });
  });

  // Person model routes
  this.route('people', function() {
    this.route('new');
  });

  this.route('person', { path: '/person/:person_id' }, function() {
    this.route('edit', { path: '/edit'});
  });

  // Topic model routes
  this.route('topics', function() {
    this.route('new');
  });

  this.route('topic', { path: '/topic/:topic_slug' }, function() {
    this.route('edit');
  });

  // Pick model routes
  this.route('picks', function() {
    // Temporarily disable pick creation
    // this.route('new');
  });

  this.route('pick', { path: '/pick/:pick_id' }, function() {
    this.route('edit');
  });

  this.route('login');
  this.route('about');
});

export default Router;
