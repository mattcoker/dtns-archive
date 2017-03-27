import Ember from 'ember';
import imageCropper from 'ember-cli-image-cropper/components/image-cropper';

export default imageCropper.extend({
  firebaseApp: Ember.inject.service(),

  //override default options of cropper
  aspectRatio: 1.2040816327,
  viewMode: 1,
  minCropBoxWidth: 236,
  minCropBoxHeight: 196,
  cropperContainer: '.cropper-container > img',
  previewClass: '.img-preview',
  croppedAvatar: null,
  checkCrossOrigin: true,
  resizable: false,
  responsive: true,
  zoomable: false,
  modal: true,

  actions: {
    getCroppedImage: function() {
      var container = this.$(this.get('cropperContainer'));
      var croppedImage = container.cropper('getCroppedCanvas');
      this.set('croppedImage', croppedImage);
    },

    updatePhoto() {
      // this.set('image', newImage);
      const fullName = this.get('personName').dasherize(),
            timestamp = (new Date()).getTime(),
            fileName = `${fullName}-${timestamp}.png`,
            fileContents = Ember.$('canvas')[0].toDataURL();

      const firebaseApp = this.get('firebaseApp'),
            storageRef = firebaseApp.storage().ref(),
            uploadTask = storageRef.child('images/' + fileName).putString(fileContents, 'data_url');

      uploadTask.on(window.firebase.storage.TaskEvent.STATE_CHANGED,
        () => { /* not updating progress at this time */ },
        (error) => {
          console.log(error);
        },
        () => {
          this.set('image', uploadTask.snapshot.downloadURL);
          this.sendAction('closeModal');
        }
      );



      // // var storageRef = firebase.storage().ref().child("images");
      // // // var imageRef = "Your path in the Realtime Database";

      // // // storageRef.getDownloadURL().then(function(url) {
      // // //   imageRef.child("image").set(url);
      // // // });

      // // var task = storageRef.putString(newImage, 'base64').then(function(snapshot) {
      // //   console.log('Uploaded a base64 string!', snapshot);
      // // });

      // this.sendAction('closeModal');
    }
  }
});