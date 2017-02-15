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
    this.set('titleToken', `Editing ${model.get('name')} Topic`);
  },

  actions: {
    saveTopic(topic) {
      topic.set('updatedAt', new Date());
      topic.save().then(() => {
        this.transitionTo('topic.index', topic.get('slug'));
      });
    },

    cancelTopic(topic) {
      topic.rollbackAttributes();
      this.transitionTo('topic.index', topic.get('slug'));
    }
  }
});
