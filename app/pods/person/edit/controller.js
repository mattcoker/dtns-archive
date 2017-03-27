import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),
  fileProgress: 0,

  actions: {
    didSelectFiles(data) {
      const file = data[0];
      this.set('isUploading', true);

      if (file) {
        const firebaseApp = this.get('firebaseApp'),
              storageRef = firebaseApp.storage().ref(),
              uploadTask = storageRef.child('images/' + file.name).put(file);
        uploadTask.on(window.firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.set('fileProgress', progress);
            switch (snapshot.state) {
              case window.firebase.storage.TaskState.PAUSED:
                this.set('status', 'Upload is paused');
                break;
              case window.firebase.storage.TaskState.RUNNING:
                this.set('status', 'Upload is running');
                break;
            }
          }, (error) => {
            this.set('isUploading', false);
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
          }
        }, () => {
          this.setProperties({
            isUploading: false,
            fileProgress: 0
          });

          this.set('model.photo', uploadTask.snapshot.downloadURL);

          this.setProperties({
            isUploading: false,
            fileProgress: 0,
            useExistingPhoto: true
          });
        });
      }
    },

    closePhotoEditModal() {
      this.setProperties({
        useExistingPhoto: false,
        showPhotoEditModal: false
      });
    }
  }
});
