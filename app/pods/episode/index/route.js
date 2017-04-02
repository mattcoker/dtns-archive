import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: '',

  model() {
    const episodeId = this.paramsFor('episode').episode_id;
    return this.get('store').findRecord('episode', episodeId);
  },

  afterModel(model) {
    this.set('titleToken', model.get('displayName'));
  },

  headTags: function() {
    let model = this.modelFor(this.routeName);
    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Viewing details for DTNS episode #${model.get('displayName')}. ${model.get('description')}`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, archive, daily tech news show, episode, #${model.get('displayName')}`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
