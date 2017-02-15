import Ember from 'ember';
import DateTimeFormatMixin from 'dtns-frontend/mixins/date-time-format';
import { module, test } from 'qunit';

module('Unit | Mixin | date time format');

// Replace this with your real tests.
test('it works', function(assert) {
  let DateTimeFormatObject = Ember.Object.extend(DateTimeFormatMixin);
  let subject = DateTimeFormatObject.create();
  assert.ok(subject);
});
