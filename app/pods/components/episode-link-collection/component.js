import Ember from 'ember';

export default Ember.Component.extend({
  recentEpisodes: Ember.computed('episodes.[]', function() {
    return this.get('episodes').slice(0, 10);
  }),

  hasMoreEpisodes: Ember.computed.gt('episodes.length', 10)
});
