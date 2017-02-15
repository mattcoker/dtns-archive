import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: '',

  model() {
    const topicSlug = this.paramsFor('topic').topic_slug;

    return this.store.query('topic', {
      orderBy: 'slug',
      equalTo: topicSlug
    }).then((data) => {
      if (data.get('firstObject')) {
        return data.get('firstObject');
      }
    });
  },

  afterModel(model) {
    this.set('titleToken', model.get('name'));
  }
});
