import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('episode-link-collection', 'Integration | Component | episode link collection', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{episode-link-collection}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#episode-link-collection}}
      template block text
    {{/episode-link-collection}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
