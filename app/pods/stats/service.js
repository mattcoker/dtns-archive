import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.get('store').findAll('stats').then((allStats) => {
      this.set('model', allStats.get('firstObject'));
    });
  },

  peopleCount:      Ember.computed.alias('model.peopleCount'),
  episodesCount:    Ember.computed.alias('model.episodesCount'),
  picksCount:       Ember.computed.alias('model.picksCount'),
  topicsCount:      Ember.computed.alias('model.topicsCount'),
  patronCount:      Ember.computed.alias('model.patronCount'),
  totalPledged:     Ember.computed('model.totalPledged', function() {
    return Math.round(this.get('model.totalPledged') / 100);
  }),
  amountToNextGoal: Ember.computed('model.amountToNextGoal', function() {
    return Math.round(this.get('model.amountToNextGoal') / 100);
  }),

  percentageOfNextGoal: Ember.computed('model.totalPledged', 'model.amountToNextGoal', function() {
    const { totalPledged, amountToNextGoal } = this.getProperties('totalPledged', 'amountToNextGoal');
    return (totalPledged / (totalPledged + amountToNextGoal)) * 100 ;
  }),
});
