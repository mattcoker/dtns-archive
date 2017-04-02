import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: Ember.computed('controller.model.name', function() {
    return this.controller.get('model.name');
  }),

  model() {

    const pickId = this.paramsFor('pick').pick_id;
    return this.get('store').findRecord('pick', pickId).then((pick) => {
      return Ember.RSVP.hash({
        pick: pick,
        episode: pick.get('episode')
      });
    });
  },

  setupController(controller, models) {
    controller.set('model', models.pick);
    controller.set('episode', models.episode);
  },

  headTags: function() {
    let { pick, episode } = this.modelFor(this.routeName);

    let description = `${pick.get('name')} is a ${pick.get('category').toLowerCase()} recommendation`;
    description += (episode) ? `, as featured in Daily Tech News Show episode #${episode.get('episodeNumber')}.` : '.';
    description += (pick.get('url')) ? ` More information can be found at ${pick.get('url')}.` : '';

    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: description,
          encoding: 'UTF-8'
        }
      }, {
        type: 'meta',
        tagId: 'meta-keywords-tag',
        attrs: {
          name: 'keywords',
          content: `dtns, archive, daily tech news show, pick, ${pick.get('name')}, ${pick.get('category')}`,
          encoding: 'UTF-8'
        }
      }
    ];

  }
});
