import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Settings',

  headTags: function() {
    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Customize your DTNS Archive experience, by changing how archival content is displayed (tables or cards) and set your preferred date/time formats`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, podcast, archive, daily tech news show, settings, personal preferences`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
