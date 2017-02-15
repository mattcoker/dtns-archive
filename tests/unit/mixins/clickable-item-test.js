import Ember from 'ember';
import ClickableItemMixin from 'dtns-frontend/mixins/clickable-item';
import { module, test } from 'qunit';

module('Unit | Mixin | clickable item');

// Replace this with your real tests.
test('it works', function(assert) {
  let ClickableItemObject = Ember.Object.extend(ClickableItemMixin);
  let subject = ClickableItemObject.create();
  assert.ok(subject);
});
