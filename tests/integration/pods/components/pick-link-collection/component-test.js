import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pick-link-collection', 'Integration | Component | pick link collection', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pick-link-collection}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pick-link-collection}}
      template block text
    {{/pick-link-collection}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
