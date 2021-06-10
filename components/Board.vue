<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="status in statusList" :key="status.id">
        <v-sheet
          :id="status.id"
          :height="columnHeight"
          elevation="10"
          width="100%"
          rounded
        >
          <p class="text-subtitle-1 pt-4 text-center">{{ status.name }}</p>
          <v-divider></v-divider>

          <v-flex>
            <v-card
              class="ma-2 cursor-pointer"
              color="grey darken-2"
              v-for="item in data[status.id]"
              :key="item.id"
              @dblclick="$emit('doEdit', item)"
            >
              <v-app-bar dense flat>
                <v-toolbar-title class="text-body-2">
                  {{ item.name }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon class="draggable-icon">mdi-drag-variant</v-icon>
              </v-app-bar>

              <v-card-text>
                {{ descriptionResize(item.description) }}
                <v-row>
                  <v-col class="d-flex justify-space-between align-center pb-0 mt-4">
                    {{ item.assessment }}
                    <Timer :id="item.id" :value="item.time" entity="task" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-end">
                    {{ item.client.name }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Timer from "../components/Timer";

export default {
  name: "Board",
  components: { Timer },
  created() {
    window.addEventListener("resize", this.windowResize);
    this.windowResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.windowResize);
  },
  props: {
    data: Object,
  },
  data() {
    return {
      columnHeight: 0,
      strSize: 100,
    };
  },
  computed: {
    statusList() {
      return this.$store.getters["taskStatus/list"].filter(
        (item) => item.sort < 5
      );
    },
  },
  methods: {
    windowResize() {
      this.$nextTick(() => {
        let allH = window.innerHeight;
        let topBarH = document.querySelector(".v-app-bar").offsetHeight;
        let bottomBarH = document.querySelector(".v-footer").offsetHeight;

        this.columnHeight = allH - topBarH - bottomBarH - 25;
      });
    },
    descriptionResize(str) {
      if (typeof str !== "string") return '';
      return str.length > this.strSize
        ? str.substr(0, this.strSize) + "..."
        : str;
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
.draggable-icon {
  color: #ffffff29 !important;
  cursor: move;
  display: none !important;
}
</style>