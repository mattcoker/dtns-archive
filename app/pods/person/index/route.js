import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: '',

  model() {
    const personId = this.paramsFor('person').person_id;
    return this.get('store').findRecord('person', personId);
  },

  afterModel(model) {
    this.set('titleToken', model.get('fullName'));
  },

  headTags: function() {
    let model = this.modelFor(this.routeName);

    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Viewing details for ${model.get('fullName')}. ${model.get('description')}`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, archive, daily tech news show, person, ${model.get('fullName')}`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
