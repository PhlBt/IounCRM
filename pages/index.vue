<template>
  <v-flex class="col-10 offset-1 mt-6">
    <v-row>
      <v-col cols="2">
        <v-card class="test" color="primary" dark>
          <v-card-title>{{ owner.sum }} р.</v-card-title>
          <v-card-text>Заработанно за текущий год</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script>
export default {
  name: "home",
  created() {
    this.$store.commit("setTitle", "Главная");
    this.$store.dispatch("client/getClientList");
  },
  methods: {},
  computed: {
    owner() {
      return (
        this.$store.getters["client/get"]("hgNIKngBduiR0g1PRlr1") || { sum: 0 }
      )
    },
  },
};
</script>
