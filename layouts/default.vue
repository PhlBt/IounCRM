<template>
  <v-app dark>

    <LeftBar :drawer="drawer"></LeftBar>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="this.$store.getters.title" />

      <v-spacer />
      <portal-target name="controls"/>
      <v-btn
        color="info"
        tile
        class="mr-2"
        to="/profile">
        <v-icon left>
          mdi-account-circle-outline
        </v-icon>
        {{ this.user.name }}
      </v-btn>
      <v-btn
        color="info"
        tile>
        <v-icon 
          @click="logout()">
          mdi-login
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <Notification/>

    <v-footer app fixed class="footer">
      <span class="mr-6">
        <v-icon class="mr-2" size="16">mdi-copyright</v-icon>
        2020 - {{ new Date().getFullYear() }}
      </span>
      <span>
        <v-icon class="mr-2" size="18">mdi-telegram</v-icon>
        <a href="https://t.me/PhlBt">PhlBt</a>
      </span>
    </v-footer>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import LeftBar from '../components/LeftBar'
import Notification from '../components/Notification'

export default {
  components: {
    LeftBar,
    Notification
  },
  data () {
    return {
      drawer: true,
    }
  },
  computed: {
    ...mapGetters({user: 'auth/user'})
  },
  methods: {
    logout: function() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>