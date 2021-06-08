<template>
  <v-flex class="col-10 offset-1 mt-6">
    <v-row>
      <v-col cols="2">
        <v-card class="test" color="primary" dark>
          <v-card-title>{{ sum }} р.</v-card-title>
          <v-card-text>Заработанно за текущий год</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script>
export default {
  head: {
    title: "Главная",
  },
  created() {
    this.$store.commit("setTitle", "Главная");
  },
  methods: {},
  computed: {
    sum() {
      return (
        this.$store.getters["auth/user"].legal.sum || 0
      );
    },
  },
};
</script>
