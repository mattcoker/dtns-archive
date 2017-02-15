import Ember from 'ember';
import DateTimeFormatMixin from '../../../mixins/date-time-format';

export default Ember.Controller.extend(DateTimeFormatMixin, {
  playerVars: {
    autoplay: 0,
    showinfo: 0,
    controls: 1,
    fs: 1,
    modestbranding: 1
  },

  hasDownloadURL: Ember.computed.bool('model.downloadURL'),
  hasShowNotesURL: Ember.computed.bool('model.showNotesURL'),

  downloadLink: Ember.computed('model.downloadURL', 'model.episodeNumber', function() {
    const url = this.get('model.downloadURL');
    const episodeNumber = this.get('model.episodeNumber');
    if (url) {
      return new Ember.String.htmlSafe(`<a href="${url}" target="_blank">Click to download episode #${episodeNumber}</a>`);
    }

    return 'none';
  }),

  showNotesLink: Ember.computed('model.showNotesURL', function() {
    const url = this.get('model.showNotesURL');
    if (url) {
      return new Ember.String.htmlSafe(`<a href="${url}" target="_blank">Click to view show notes</a>`);
    }

    return 'none';
  })
});
