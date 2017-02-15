import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Picks',

  model() {
    return this.get('store').findAll('pick');
  }
});
