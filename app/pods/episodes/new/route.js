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

        return Ember.RSVP.all(addHosts, addContributors, addGuests);
      }).then(() => {
        this.transitionTo('episodes.index');
      }).catch((err) => {
        console.log(err);
      });
    }
  }
});
