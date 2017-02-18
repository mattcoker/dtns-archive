import Ember from 'ember';
import AuthRedirectMixin from '../../../mixins/auth-redirect';

export default Ember.Route.extend(AuthRedirectMixin, {
  model() {
    const store = this.get('store');
    return Ember.RSVP.hash({
      episode: this.modelFor('episode'),
      people: store.findAll('person'),
      topics: store.findAll('topic'),
      picks: store.findAll('pick')
    });
  },

  afterModel(model) {
    this._super(...arguments);
    const episode = model.episode;
    this.set('originalHosts', episode.get('hosts').toArray());
    this.set('originalContributors', episode.get('contributors').toArray());
    this.set('originalGuests', episode.get('guests').toArray());
    this.set('originalTopics', episode.get('topics').toArray());
    this.set('originalPicks', episode.get('picks').toArray());
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties({
      model: models.episode,
      people: models.people,
      topics: models.topics,
      picks: models.picks
    });
  },

  titleToken: Ember.computed('model.displayName', function() {
    return `Editing ${this.controller.get('model.displayName')}`;
  }),

  currentHosts: Ember.computed.alias('currentModel.episode.hosts'),
  currentContributors: Ember.computed.alias('currentModel.episode.contributors'),
  currentGuests: Ember.computed.alias('currentModel.episode.guests'),
  currentTopics: Ember.computed.alias('currentModel.episode.topics'),
  currentPicks: Ember.computed.alias('currentModel.episode.picks'),

  removedHosts: Ember.computed('currentHosts.[]', 'originalHosts.[]', function() {
    const currentHosts = this.get('currentHosts');

    return this.get('originalHosts').filter((person) => {
      return !currentHosts.includes(person);
    });
  }),

  removedContributors: Ember.computed('currentContributors.[]', 'originalContributors.[]', function() {
    const currentContributors = this.get('currentContributors');

    return this.get('originalContributors').filter((person) => {
      return !currentContributors.includes(person);
    });
  }),

  removedGuests: Ember.computed('currentGuests.[]', 'originalGuests.[]', function() {
    const currentGuests = this.get('currentGuests');

    return this.get('originalGuests').filter((person) => {
      return !currentGuests.includes(person);
    });
  }),

  removedTopics: Ember.computed('currentTopics.[]', 'originalTopics.[]', function() {
    const currentTopics = this.get('currentTopics');

    return this.get('originalTopics').filter((topic) => {
      return !currentTopics.includes(topic);
    });
  }),

  removedPicks: Ember.computed('currentPicks.[]', 'originalPicks.[]', function() {
    const currentPicks = this.get('currentPicks');

    return this.get('originalPicks').filter((pick) => {
      return !currentPicks.includes(pick);
    });
  }),

  actions: {
    saveEpisode(episode) {
      episode.set('updatedAt', new Date());

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
        const disassociateHosts = this.get('removedHosts').map((person) => {
          person.get('episodesAsHost').removeObject(episode);
          return person.save();
        });

        const disassociateContributors = this.get('removedContributors').map((person) => {
          person.get('episodesAsContributor').removeObject(episode);
          return person.save();
        });

        const disassociateGuests = this.get('removedGuests').map((person) => {
          person.get('episodesAsGuest').removeObject(episode);
          return person.save();
        });

        return Ember.RSVP.all(disassociateHosts, disassociateContributors, disassociateGuests);
      }).then(() => {
        const addTopics = this.get('currentTopics').map((topic) => {
          topic.get('episodes').pushObject(episode);
          return topic.save();
        });

        const disassociateTopics = this.get('removedTopics').map((topic) => {
          topic.get('episodes').removeObject(episode);
          return topic.save();
        });

        return Ember.RSVP.all(addTopics, disassociateTopics);
      }).then(() => {
        const addPicks = this.get('currentPicks').map((pick) => {
          pick.set('episode', episode);
          return pick.save();
        });

        const disassociatePicks = this.get('removedPicks').map((pick) => {
          pick.set('episode', null);
          return pick.save();
        });

        return Ember.RSVP.all(addPicks, disassociatePicks);
      }).then(() => {
        this.transitionTo('episode.index', episode);
      });
    },

    cancelEpisode(episode) {
      episode.rollbackAttributes();
      this.transitionTo('episode.index', episode);
    }
  }

});
