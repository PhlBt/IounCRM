<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    app
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'LeftBar',
  props: {
    drawer: Boolean,
  },
  data() {
    return {
      items: this.$store.getters.menu
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>