<template></template>

<script>
export default {
  components: {},
  head: {
    title: "Профиль пользователя",
  },
  data() {
    return {};
  },
  computed: {},
  method: {},
  created() {
    this.$store.commit("setTitle", "Профиль пользователя");
  },
};
</script>
