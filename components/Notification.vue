<template>

  <v-container fluid class="container-list-complite">
    <v-row>
      <v-col cols="4" class="ml-auto mr-3">
        <transition-group tag="div" name="list-complete">
          <v-alert
            dense
            v-for="item in items"
            :key="item.id"
            :color="alerts[item.type].color"
            class="pa-0 list-complete-item"
          >
            <v-container fluid @click="close(item.id)">
              <v-row class="pa-0 ma-0">
                <v-col cols="1" class="pa-0 ma-0 align-center align-self-center"><v-icon>{{alerts[item.type].icon}}</v-icon></v-col>
                <v-col cols="11" class="pa-3 ma-0 align-self-center">{{item.message}}</v-col>
              </v-row>
            </v-container>
          </v-alert>
        </transition-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
      name: "Notification",
      data(){
        return {
          alerts: {
            error: { color: 'error', icon: 'mdi-alert-circle' },
            success: { color: 'success', icon: 'mdi-check-circle' }
          },
        }
      },
      methods: {
        close(id) {
          this.$store.commit('removeAlert', id)
        }
      },
      computed: {
        items() { return this.$store.getters.alerts }
      }
    }
</script>

<style>
  .container-list-complite {
    position: absolute;
    bottom: 30px;
  }
  .list-complete-item {
    transition: all 1s;
    margin-right: 10px;
    z-index: 1000;
  }
  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateX(300px);
  }
</style>