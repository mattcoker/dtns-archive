import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'People',

  model() {
    return this.get('store').query('person', {
      orderBy: 'lastName'
    });
  },

  setupController(controller, model) {
    controller.set('people', model);
  },

  headTags: function() {
    let people = this.modelFor(this.routeName);

    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: `Daily Tech News Show has been host to over ${people.get('length')} people since starting in 2014. Here you can easily search through previous guests and contributors with ease.`,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, podcast, archive, daily tech news show, search, people, hosts, guests, contributors`,
          encoding: 'UTF-8'
        }
      }
    ];
  }
});
