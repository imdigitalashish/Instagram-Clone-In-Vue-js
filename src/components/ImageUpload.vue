<template>
  <div style="padding: 10px">
    <v-card style="padding: 20px">
      <h3>Upload a Post</h3>
      <br>
      <v-text-field label="Enter a Caption" v-model="text"></v-text-field>
      <input @change="processFile($event)" type="file"/>
      <v-btn @click="handleUpload">Upload</v-btn>
      <v-progress-linear style="padding:10px; margin-top: 20px" :value="Upload_progress"></v-progress-linear>

    </v-card>

  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import {storage, db} from '../firebase';
import firebase from "firebase";

export default {
  name: "ImageUpload",
  data: () => ({
    text: "",
    image: ImageData,
    Upload_progress: 0,
  }),
  props: {
    username: String
  },
  methods: {
    processFile(event) {
      this.image = event.target.files[0]
    },
    handleUpload() {
      const uploadTask = storage.ref(`images/${this.image.name}`).put(this.image);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.Upload_progress = progress;
          },
          (error) => {
            console.log(error);
            alert(error.message);
          },
          () => {
            storage
                .ref("images")
                .child(this.image.name)
                .getDownloadURL()
                .then(url => {
                  console.log(`caption ${this.text}`);
                  console.log(`username: ${this.username}`);
                  console.log(`time: ${firebase.firestore.FieldValue.serverTimestamp()}`);
                  console.log(`url: ${url}`);
                  db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: this.text,
                    imageUrl: url,
                    username: this.username
                  });
                  this.Upload_progress = 0;
                  this.text = "";
                  this.image = "";
                })
          }
      )
    }
  }
}
</script>

<style scoped>

</style>
