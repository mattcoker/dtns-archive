import Ember from 'ember';
import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';
import { storageFor } from 'ember-local-storage';
import moment from 'moment';

export default Model.extend({
  settings: storageFor('settings'),

  episodeNumber  : attr('string'),
  episodeName    : attr('string'),
  description    : attr('string'),
  downloadURL    : attr('string'),
  showNotesURL   : attr('string'),
  youtubeId      : attr('string'),

  hosts          : hasMany('person', { async: true, inverse: null }),
  contributors   : hasMany('person', { async: true, inverse: null }),
  guests         : hasMany('person', { async: true, inverse: null }),
  topics         : hasMany('topic', { async: true, inverse: null }),
  picks          : hasMany('pick', { async: true, inverse: null }),

  airDate        : attr('date', { defaultValue() { return new Date(); } }),
  createdAt      : attr('date', { defaultValue() { return new Date(); } }),
  updatedAt      : attr('date', { defaultValue() { return new Date(); } }),
  requiresReview : attr('boolean', { defaultValue: false }),

  displayName    : Ember.computed('episodeNumber', 'episodeName', function() {
    return `${this.get('episodeNumber')}: ${this.get('episodeName')}`;
  }),

  people: Ember.computed('hosts[]', 'contributors[]','guests[]', function() {
    const { hosts, contributors, guests } = this.getProperties('hosts', 'contributors', 'guests');
    const allPeople = [];

    hosts.forEach((person) => { allPeople.pushObject(person); });
    contributors.forEach((person) => { allPeople.pushObject(person); });
    guests.forEach((person) => { allPeople.pushObject(person); });

    return allPeople;
    // return hosts.concat(contributors, guests);
  }),

  allText: Ember.computed('episodeNumber', 'episodeName', 'description', 'airDate', function() {
    const episodeNumber = this.get('episodeNumber');
    const episodeName = this.get('episodeName');
    const description = this.get('description');
    const airDate = moment(this.get('airDate')).format(this.get('settings.globalDateFormat'));
    return `${episodeNumber}|${episodeName}|${description}|${airDate}`;
  }),

  tableCells: Ember.computed('episodeNumber', 'episodeName', 'description', 'airDate', function() {
    const allProperties = this.getProperties('episodeNumber', 'episodeName', 'description', 'airDate');
    allProperties.airDate = moment(allProperties.airDate).format("YYYY-MM-DD HH:mm:ss");
    return allProperties;
  }),

  tableColumns: ['Episode Number', 'Episode Name', 'Description', 'Air Date']
});
