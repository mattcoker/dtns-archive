import Ember from 'ember';

export default Ember.Mixin.create({
  click() {
    this.sendAction('itemClick', this.get('model'));
  }
});
