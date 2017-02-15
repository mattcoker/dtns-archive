import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Topics',

  model() {
    return this.get('store').findAll('topic', { orderBy: 'episodeNumber' });
  }
});
