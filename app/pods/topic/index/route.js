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
        return Ember.RSVP.hash({
          topic: data.get('firstObject'),
          episodes: data.get('firstObject.episodes')
        });
      }
    });
  },

  afterModel(models) {
    this.set('titleToken', models.topic.get('name'));
  },

  setupController(controller, models) {
    controller.set('model', models.topic);
    controller.set('episodes', models.episodes);
  },

  headTags: function() {
    let { topic, episodes} = this.modelFor(this.routeName);
    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Viewing ${episodes.get('length')} DTNS episodes discussing ${topic.get('name').toLowerCase()}.`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, archive, daily tech news show, topic, ${topic.get('name')}`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
