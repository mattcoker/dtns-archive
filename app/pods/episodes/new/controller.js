import Ember from 'ember';
import getYoutubeId from 'npm:get-youtube-id';

export default Ember.Controller.extend({
  currDate: new Date(),
  maxNumberOfTopics: 3,

  playerVars: {
    autoplay: 0,
    showinfo: 0,
    controls: 1,
    fs: 1,
    modestbranding: 1,
    iv_load_policy: 3
  },

  hosts:        Ember.computed.alias('model.hosts'),
  contributors: Ember.computed.alias('model.contributors'),
  guests:       Ember.computed.alias('model.guests'),

  possibleHosts: Ember.computed('contributors.@each', 'guests.@each', 'people.@each', function() {
    const currContributors = this.get('contributors');
    const currGuests = this.get('guests');

    return this.get('people').filter((person) => {
      return !currContributors.includes(person) && !currGuests.includes(person);
    });
  }),

  possibleContributors: Ember.computed('hosts.@each', 'guests.@each', 'people.@each', function() {
    const currHosts = this.get('hosts');
    const currGuests = this.get('guests');

    return this.get('people').filter((person) => {
      return !currHosts.includes(person) && !currGuests.includes(person);
    });
  }),

  possibleGuests: Ember.computed('hosts.@each', 'contributors.@each', 'people.@each', function() {
    const currHosts = this.get('hosts');
    const currContributors = this.get('contributors');

    return this.get('people').filter((person) => {
      return !currHosts.includes(person) && !currContributors.includes(person);
    });
  }),

  parseYoutubeURL: Ember.observer('model.youtubeId', function() {
    let youtubeValue = this.get('model.youtubeId');
    if (youtubeValue && youtubeValue.indexOf('youtu') > -1) {
      this.set('model.youtubeId', getYoutubeId(youtubeValue));
    }
  }),

  actions: {
    updateAirDate(newAirDate) {
      this.set('model.airDate', newAirDate);
    },

    parseYoutubeURL(val) {
      const params = val.split('v=')[1];
      if (params) {
        const ampersandPosition = params.indexOf('&');
        if(ampersandPosition !== -1) {
          this.set('model.youtubeId', params.substring(0, ampersandPosition));
        }
      }
    },

    updateUnlessFull(newOpts) {
      const maxNumberOfTopics = this.get('maxNumberOfTopics');
      const topics = this.get('model.topics');
      if (topics.get('length') < maxNumberOfTopics || newOpts.length <= topics.get('length')) {
        this.set('model.topics', newOpts);
      }
    }
  }
});
