import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
  settings: storageFor('settings'),

  didReceiveAttrs() {
    this.set('visibleEpisodes', this.get('episodes').slice(0, 24));
  },

  reachedEnd: Ember.computed('visibleEpisodes.length', 'episodes.length', function() {
    const visibleEpisodesLength = this.get('visibleEpisodes.length');
    const episodesLength = this.get('episodes.length');
    return (visibleEpisodesLength === episodesLength);
  }),

  actions: {
    updateContent() {
      const visibleEpisodesLength = this.get('visibleEpisodes.length');
      const episodes = this.get('episodes');
      const episodesToMove = episodes.slice(visibleEpisodesLength, visibleEpisodesLength + 24);

      this.get('visibleEpisodes').pushObjects(episodesToMove);
    }
  }
});
