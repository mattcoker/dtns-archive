import DS from 'ember-data';

export default DS.Model.extend({
  peopleCount: DS.attr('number'),
  episodesCount: DS.attr('number'),
  picksCount: DS.attr('number'),
  topicsCount: DS.attr('number'),
  patronCount: DS.attr('number'),
  totalPledged: DS.attr('number'),
  amountToNextGoal: DS.attr('number')
});
