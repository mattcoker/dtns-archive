import Ember from 'ember';
import getYoutubeId from 'npm:get-youtube-id';

export default Ember.Controller.extend({
  currDate: new Date(),

  playerVars: {
    autoplay: 0,
    showinfo: 0,
    controls: 1,
    fs: 1,
    modestbranding: 1,
    iv_load_policy: 3
  },

  hosts:        Ember.computed.alias('episode.hosts'),
  contributors: Ember.computed.alias('episode.contributors'),
  guests:       Ember.computed.alias('episode.guests'),

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

  parseYoutubeURL: Ember.observer('episode.youtubeId', function() {
    let youtubeValue = this.get('episode.youtubeId');
    if (youtubeValue && youtubeValue.indexOf('youtu') > -1) {
      this.set('episode.youtubeId', getYoutubeId(youtubeValue));
    }
  }),

  actions: {
    updateAirDate(newAirDate) {
      this.set('episode.airDate', newAirDate);
    },

    parseYoutubeURL(val) {
      const params = val.split('v=')[1];
      if (params) {
        const ampersandPosition = params.indexOf('&');
        if(ampersandPosition !== -1) {
          this.set('episode.youtubeId', params.substring(0, ampersandPosition));
        }
      }
    }
  }
});
