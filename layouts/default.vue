<template>
  <v-app dark>

    <LeftBar :drawer="drawer"></LeftBar>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="this.$store.getters.title" />

      <v-spacer />
      <v-card dark>
        <v-row class="d-flex justify-space-around align-center">
          <v-card-title>
            <v-icon>mdi-account</v-icon>
            <span class="user">{{ user.name }}</span>
            <v-icon @click="logout()">mdi-login</v-icon>
          </v-card-title>
        </v-row>
      </v-card>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <Notification/>

    <v-footer app fixed class="footer">
      <span class="mr-6"><v-icon class="mr-2" size="16">mdi-copyright</v-icon>{{ new Date().getFullYear() }}</span>
      <span><v-icon class="mr-2" size="18">mdi-telegram</v-icon><a href="https://t.me/PhlBt">PhlBt</a></span>
    </v-footer>

  </v-app>
</template>

<script>
import LeftBar from '../components/LeftBar'
export default {
  components: {
    LeftBar
  },
  data () {
    return {
      drawer: true,
      user: this.$store.getters.user
    }
  },
  methods: {
    logout: function() {
      this.$fire.auth.signOut()
    }
  }
}
</script>

<style scoped>
  .user {
    padding: 0 10px;
  }
</style>