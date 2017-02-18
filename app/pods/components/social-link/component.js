import Ember from 'ember';

export default Ember.Component.extend({
  identifier: '',
  type: '',

  socialURL: Ember.computed('identifier', 'type', function() {
    const { identifier, type } = this.getProperties('identifier', 'type');
    const prefix = 'https://';
    let url = null;

    switch(type) {
      case 'facebook':
        url = `${prefix}facebook.com/${identifier}`;
        break;
      case 'twitter':
        url = `${prefix}twitter.com/${identifier}`;
        break;
      default:
        // no default;
    }

    return url;
  })
});
