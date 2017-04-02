import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Picks',

  model() {
    return this.get('store').findAll('pick');
  },

  headTags: function() {
    let picks = this.modelFor(this.routeName);
    let picksEstimate = Math.floor(picks.get('length')/10) * 10;

    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Daily Tech News Show often receives service and product recommendations from its listeners. Here you can easily search through more than ${picksEstimate} of these picks-of-the-day with ease.`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, podcast, archive, daily tech news show, search, picks, picks of the day, recommendations`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
