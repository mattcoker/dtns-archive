import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  name: DS.attr('string'),
  category: DS.attr('string'),
  description: DS.attr('string'),
  url: DS.attr('string'),
  showNotesText: DS.attr('string'),
  episode: belongsTo('episode', { async: true, inverse: null }),
  createdAt: DS.attr('date', { defaultValue() { return new Date(); } }),
  updatedAt: DS.attr('date', { defaultValue() { return new Date(); } })
});
