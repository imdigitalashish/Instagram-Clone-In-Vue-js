<template>

  <div class="app">


    <div class=
             "app_header">
      <img class="app_headerImage" width="100"
           src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
           alt="">
      <div v-if="loggedIn">
        <div class="app__header__user">
          <v-btn @click="logout" type="submit">Logout</v-btn>
          <p class="app__header__user__name">{{ displayName }}</p></div>


      </div>
      <div v-else class="app__authentication">
        <v-bottom-sheet inset>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="#fafafa"
                dark
                style="color: black"
                v-bind="attrs"
                v-on="on"
            >
              SIGN UP
            </v-btn>
          </template>
          <form action="" class="app__signup">
            <v-card tile style="padding: 40px 40px 40px 40px">
              <div>
                <img class="app_headerImage" width="100"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                     alt="">
                <v-text-field v-model="username" label="user name"></v-text-field>
                <v-text-field v-model="email" label="email"></v-text-field>

                <v-text-field v-model="password" label="password"></v-text-field>
                <v-btn @click="signUp" type="submit">Sign Up</v-btn>
              </div>
            </v-card>
          </form>
        </v-bottom-sheet>
        <v-bottom-sheet inset>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="#fafafa"
                dark
                style="color: black"
                v-bind="attrs"
                v-on="on"
            >
              SIGN IN
            </v-btn>
          </template>
          <form action="" class="app__signup">
            <v-card tile style="padding: 40px 40px 40px 40px">
              <div>
                <img class="app_headerImage" width="100"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                     alt="">
                <!--              <v-text-field v-model="username" label="user name"></v-text-field>-->
                <v-text-field v-model="email" label="email"></v-text-field>

                <v-text-field v-model="password" label="password"></v-text-field>
                <v-btn @click="signIn" type="submit">Sign In</v-btn>
              </div>
            </v-card>
          </form>
        </v-bottom-sheet>

      </div>
    </div>

    <!-- SIGN UP BUTTON  -->
    <ImageUpload v-if="loggedIn" :username="displayName"/>


    <!-- SIGN UP END -->

    <div v-for="item in posts" v-bind:key="item" class="app__posts">

      <Post :name="item.username" :caption="item.caption" :imgUrl="item.imageUrl"/>

    </div>


  </div>


</template>

<script>
// @ is an alias to /src
import Post from "@/components/Post";
import ImageUpload from "@/components/ImageUpload";
// import {db} from "@/firebase";
import {db, auth} from '../firebase';

console.log("Hello");


// eslint-disable-next-line no-unused-vars
let posts_array = [];

export default {

  name: 'Home',
  components: {
    Post,
    ImageUpload
  },
  data: () => ({
    posts: [],
    username: '',
    email: '',
    password: '',
    loggedIn: false,
    displayName: ''
  }),
  methods: {
    signUp() {
      console.log(this.username);
      auth.createUserWithEmailAndPassword(this.email, this.password)
          .then((authUser) => {
            authUser.user.updateProfile({displayName: this.username});

            this.loggedIn = true;
          })
          .catch((error) => alert(error.message));
    },
    logout() {
      auth.signOut();
      this.loggedIn = false;
    },
    signIn() {
      auth.signInWithEmailAndPassword(this.email, this.password)
          .then((authUser) => {
            this.loggedIn = true;
            this.displayName = authUser.user.displayName;
            console.log(authUser.user.displayName);
          }).catch((error) => alert(error.message));
    }
  },
  beforeMount() {

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.loggedIn = true;
        console.log("login");
        console.log(authUser);
        if (authUser.displayName) {
          console.log("don't update username");
          this.displayName = authUser.displayName;
        } else {
          this.displayName = authUser.displayName;
          console.log(authUser.displayName);

          return authUser.updateProfile({displayName: this.username})
        }
      } else {
        console.log("Not logged in");
      }
    });
    // db.collection('posts').get()
    //     .then(snapshot => {
    //       this.posts = snapshot.docs.map(doc=>doc.data());
    //       console.log(this.posts.post);
    //     });

    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      this.posts = snapshot.docs.map(doc=>doc.data());
    })
    // db.collection("posts").onSnapshot(snapshot => {
//   snapshot.docs.map(doc => {
//
//     posts_array.push({post: doc.data(), id: doc.id});
//     for (const postsArrayElement of posts_array) {
//       console.log(postsArrayElement.post.username);
//       console.log(postsArrayElement.post.caption);
//       console.log(postsArrayElement.id);
//     }
//   })
// });
  }


  // setup(data) {
  //
  // }
  // setup() {
  //   db.collection('posts').onSnapshot(snapshot=> {
  //     snapshot.docs.map((e)=>{
  //       console.log(e);
  //     })
  //   })
  // }
}


</script>

<style>
.app {
  background: #fafafa;
}

.app_header {
  background: white;
  object-fit: contain;
  padding: 15px;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
}

.app_headerImage {
  object-fit: contain;
}

.app__header__user {
  display: flex;
  align-content: center;
}

.app__header__user__name {
  margin-left: 20px;
  margin-top: 10px;
}

.app__posts {
  padding: 20px;
  align-items: stretch;
  position: relative;
}

</style>
