import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Homepage',

  model() {
    return this.get('store').query('episode', {
      orderBy: 'airDate',
      limitToLast: 4
    });
  },

  setupController(controller, model) {
    controller.set('latestEpisodes', model.toArray().reverse());
  },

  headTags: function() {
    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Welcome to the Daily Tech News Show Archive, your dedicated repository for DTNS episodes, people, picks, and topics.`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, podcast, archive, daily tech news show, search, tech topics`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
