import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Controller.extend({
  stats: Ember.inject.service(),

  patreonURL: ENV['patreonURL']
});
