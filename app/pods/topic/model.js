import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  name: attr('string'),
  slug: attr('string'),
  description: attr('string'),
  backgroundColor: attr('string', { defaultValue: '#000000' }),
  episodes: hasMany('episode', { async: true, inverse: null }),
  createdAt: attr('date', { defaultValue() { return new Date(); } }),
  updatedAt: attr('date', { defaultValue() { return new Date(); } }),

  textColor: Ember.computed('backgroundColor', function() {
    const backgroundColor = this.get('backgroundColor');
    const r = parseInt(backgroundColor.substr(1,2),16);
    const g = parseInt(backgroundColor.substr(3,2),16);
    const b = parseInt(backgroundColor.substr(5,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 140) ? '#000000' : '#FFFFFF';
  })
});
