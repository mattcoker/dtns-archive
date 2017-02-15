import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    loginUser(email, password) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(() => {
        this.setProperties({
          email: null,
          password: null
        });

        let previousTransition = this.get('previousTransition');
        if (previousTransition) {
          previousTransition.retry();
        } else {
          this.transitionToRoute('index');
        }
      });
    }
  }
});
