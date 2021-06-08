<template>
  <v-row>
    <portal to="controls">
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mw-250" color="secondary" v-bind="attrs" v-on="on">
            {{ selectNameControls }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group mandatory color="secondary">
            <v-list-item v-for="item in clientsMenu" :key="item.id">
              <v-list-item-title @click="showClientTasks(item)">{{
                item.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-btn color="secondary" @click="doAddTask"> Добавить задачу </v-btn>
      <v-divider class="mx-4" vertical></v-divider>
    </portal>

    <Board :data="task" @doEdit="doEditTask($event)" />
    <Popup :data="popup" @close="closePopup" />
  </v-row>
</template>

<script>
import Popup from "@/components/Popup";
import Board from "@/components/Board";

export default {
  components: { Popup, Board },
  head: {
    title: "Задачи",
  },
  created() {
    this.$store.commit("setTitle", "Задачи");
    this.$store.dispatch("taskStatus/getStatusList");
    this.$store.dispatch("client/getClientList");
    this.$store.dispatch("task/getTaskList");
  },
  data() {
    return {
      selectNameControls: "Задачи: Всех клиентов",
      selectId: "all",
      columnHeight: 0,
      popup: {
        show: false,
        edit: false,
        name: "task",
        title: "Задачи",
      },
    };
  },
  computed: {
    clientsMenu() {
      return [
        { id: "all", name: "Все клиенты" },
        ...this.$store.getters[`client/list`],
      ];
    },
    task() {
      let result = {};

      this.$store.getters[`task/list`].forEach((element) => {
        if (this.selectId !== "all")
          if (element.client.id !== this.selectId) return;

        result[element.status] !== undefined
          ? result[element.status].push(element)
          : (result[element.status] = [element]);
      });

      return result;
    },
  },
  methods: {
    doAddTask() {
      this.popup.title = "Добавление новой задачи";
      this.popup.edit = false;
      this.popup.show = true;
    },
    doEditTask(item) {
      this.popup.title = "Редактирование задачи";
      this.popup.edit = item;
      this.popup.show = true;
    },
    showClientTasks(item) {
      this.selectNameControls = `Задачи: ${item.name}`;
      this.selectId = item.id;
    },
    closePopup() {
      this.popup = {
        show: false,
        edit: false,
        name: "task",
        title: "Задачи",
      };
    },
  },
};
</script>

<style>
.mw-250 {
  min-width: 250px !important;
}
</style>