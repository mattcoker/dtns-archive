import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'About',

  headTags: function() {
    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Here you can learn more about the Daily Tech News Show podcast, the DTNS Archive project, and how to contribute on GitHub.`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, podcast, archive, daily tech news show, about`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
