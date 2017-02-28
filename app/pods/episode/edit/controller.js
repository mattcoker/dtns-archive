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
    }
  }
});
