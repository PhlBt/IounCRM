<template>
  <div>
    <v-btn color="success" @click="test()"> test </v-btn>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    test() {
      this.$store.dispatch('addAlert', {
          status: false,
          message: 'Test'
        })
    },
    async readFromFirestore() {
      const messageRef = this.$fire.firestore
        .collection("users")
      try {
        const messageDoc = await messageRef.get();
        console.log(messageDoc.data())
      } catch (e) {
        console.log(e)
        return
      }
    },
  },
  created() {
    this.$store.commit('setTitle', 'Главная');
  }
};
</script>
