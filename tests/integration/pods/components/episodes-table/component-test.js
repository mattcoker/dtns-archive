import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('episodes-table', 'Integration | Component | episodes table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{episodes-table}}`);

  assert.equal(this.$().text().trim().replace(/[\r\n]/g, '').replace(/\s\s+/g, ','), `Number,Title,Description,People,Air Date`);
});
