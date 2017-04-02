import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Episodes',

  model() {
    return this.get('store').query('episode', { orderBy: 'episodeNumber' });
  },

  setupController(controller, model) {
    controller.set('episodes', model);
  },

  headTags: function() {
    let episodes = this.modelFor(this.routeName);
    let episodeEstimate = Math.floor(episodes.get('length')/10) * 10;

    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Daily Tech News Show has aired over ${episodeEstimate} episodes since starting in 2014. Here you can easily search through every episode with ease.`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, podcast, archive, daily tech news show, search, episodes`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
