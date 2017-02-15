import Ember from 'ember';
import AuthRedirectMixin from 'dtns-archive/mixins/auth-redirect';
import { module, test } from 'qunit';

module('Unit | Mixin | auth redirect');

// Replace this with your real tests.
test('it works', function(assert) {
  let AuthRedirectObject = Ember.Object.extend(AuthRedirectMixin);
  let subject = AuthRedirectObject.create();
  assert.ok(subject);
});
