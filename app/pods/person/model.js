import Ember from 'ember';
import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  title: attr('string'),
  description: attr('string'),
  photo: attr('string', { defaultValue: null }),
  twitterHandle: attr('string'),
  episodesAsHost: DS.hasMany('episode', { inverse: null }),
  episodesAsContributor: DS.hasMany('episode', { inverse: null }),
  episodesAsGuest: DS.hasMany('episode', { async: true, inverse: null }),
  createdAt: attr('date', { defaultValue() { return new Date(); } }),
  updatedAt: attr('date', { defaultValue() { return new Date(); } }),

  episodeSortingDesc: ['airDate:desc'],
  sortedEpisodesAsHost: Ember.computed.sort('episodesAsHost.[]', 'episodeSortingDesc'),
  sortedEpisodesAsContributor: Ember.computed.sort('episodesAsContributor.[]', 'episodeSortingDesc'),
  sortedEpisodesAsGuest: Ember.computed.sort('episodesAsGuest.[]', 'episodeSortingDesc'),

  fullName: Ember.computed('firstName', 'lastName', function() {
    const { firstName, lastName } = this.getProperties('firstName', 'lastName');
    return `${firstName} ${lastName}`;
  }),

  allText: Ember.computed('firstName', 'lastName', 'title', 'description', 'twitterHandle', function() {
    const firstName = this.get('firstName');
    const lastName = this.get('lastName');
    const title = this.get('title');
    const description = this.get('description');
    const twitterHandle = this.get('twitterHandle');
    return `${firstName}|${lastName}|${title}|${description}|${twitterHandle}`;
  })
});
