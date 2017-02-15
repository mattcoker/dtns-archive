import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      peopleShowGrid: true,
      episodesShowGrid: true,
      picksShowGrid: true,
      topicsShowGrid: true,
      globalDateFormat: 'YYYY-MM-DD',
      globalTimeFormat: 'h:mm a'
    };
  }
});

export default Storage;