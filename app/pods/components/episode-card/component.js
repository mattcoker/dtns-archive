import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Component.extend({
  settings: storageFor('settings'),
  classNames: ['card', 'has-footer'],
  showVideo: false,
  showReviewFlag: true,

  playerVars: {
    autoplay: 1,
    showinfo: 0,
    controls: 0,
    fs: 0,
    modestbranding: 1
  },

  actions: {
    playVideo() {
      this.set('showVideo', true);
    }
  }
});
