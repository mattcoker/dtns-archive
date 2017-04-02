import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Topics',

  model() {
    return this.get('store').findAll('topic', { orderBy: 'episodeNumber' });
  },

  headTags: function() {
    let topics = this.modelFor(this.routeName);

    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Daily Tech News Show covers almost every topic imaginable, from autonomous vehicles to virtual/augmented reality. Here you can easily search through more than ${topics.get('length')} previously discussed topics with ease.`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, podcast, archive, daily tech news show, search, topics, discussion`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
