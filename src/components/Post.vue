<template>


    <div class="post">
      <div class="post__header">
        <v-avatar
            color="primary"
            class="post__avatar"
        >
          <img src="../assets/logo.png" alt="">
        </v-avatar>
        <h3>{{ name }}</h3>

      </div>


      <img
          class="post__image"
          :src="imgUrl"
          alt=""
      >
      <h4 class="post__text">
        <strong>{{ name }}</strong> {{ caption }}
      </h4>

    </div>

</template>

<script>

// import MdAvatar from 'vue-material'


export default {
  name: "Post",
  components: {},
  props: {
    name: String,
    imgUrl: String,
    caption: String,
  },
}
</script>

<style scoped>

.post {
  max-width: 500px;
  background-color: white;
  border: 1px solid lightgray;
  margin-bottom: 45px;
  align-content: center;
}

.post__image {
  width: 100%;
  object-fit: contain;
  border-top: 1px solid lightgray;
}

.post__text {
  font-weight: normal;
  padding: 20px;
}

.post__header {
  display: flex;
  align-items: center;
  padding: 20px;
}

.post__avatar {
  margin-right: 10px;
}

</style>
