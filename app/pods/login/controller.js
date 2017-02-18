import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  errorMessage: null,

  actions: {
    loginUser(email, password) {
      this.set('errorMessage', null);
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
      }).catch((err) => {
        let errorMessage = null;

        switch (err.code) {
          case 'auth/invalid-api-key':
            errorMessage = 'The API key for this app is no longer valid. Please contact the developer for this application.';
            break;
          case 'auth/network-request-failed':
            errorMessage = "A network failure occurred while attempting to login. Please try again.<br><br>If this happens multiple times, please check your device's internet settings.";
            break;
          case 'auth/user-disabled':
            errorMessage = 'The user account for the email/password combination you provided has been disabled. If you believe this is in error, please contact the developer of this application.';
            break;
          default:
            errorMessage = 'The provided email/password combination was not valid. Please try again.'
        }
        this.set('errorMessage', errorMessage);
      });
    }
  }
});
