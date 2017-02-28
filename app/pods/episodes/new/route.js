import Ember from 'ember';
import AuthRedirectMixin from '../../../mixins/auth-redirect';

export default Ember.Route.extend(AuthRedirectMixin, {
  titleToken: 'Add New Episode',

  model() {
    return Ember.RSVP.hash({
      episode: this.get('store').createRecord('episode', {}),
      people: this.get('store').query('person', { orderBy: 'lastName' })
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.set('episode', models.episode);
    controller.set('people', models.people);
  },

  actions: {
    saveEpisode(episode) {
      episode.save().then(() => {
        const addHosts = episode.get('hosts').map((person) => {
          person.get('episodesAsHost').pushObject(episode);
          return person.save();
        });

        const addContributors = episode.get('contributors').map((person) => {
          person.get('episodesAsContributor').pushObject(episode);
          return person.save();
        });

        const addGuests = episode.get('guests').map((person) => {
          person.get('episodesAsGuest').pushObject(episode);
          return person.save();
        });

        const addTopics = this.get('currentTopics').map((topic) => {
          topic.get('episodes').pushObject(episode);
          return topic.save();
        });

        const addPicks = this.get('currentPicks').map((pick) => {
          pick.set('episode', episode);
          return pick.save();
        });

        return Ember.RSVP.all(addHosts, addContributors, addGuests, addTopics, addPicks);
      }).then(() => {
        this.transitionTo('episodes.index');
      }).catch((err) => {
        console.log(err);
      });
    }
  }
});
