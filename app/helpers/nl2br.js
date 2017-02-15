import Ember from 'ember';

export function nl2br(params/*, hash*/) {
  const value = params[0];
  const breakTag = '<br />';

  return Ember.String.htmlSafe((value + '')
    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'));
}

export default Ember.Helper.helper(nl2br);
