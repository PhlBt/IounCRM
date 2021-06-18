<template>
  <div>

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
      <v-divider class="mx-4" vertical></v-divider>
    </portal>

    <List itemsName="bill/list" :headers="headers" :select="selectId">
      <template v-slot:[`headerAction`]>
        <v-btn color="secondary" @click="doAddBill()"> Добавить </v-btn>
      </template>

      <template v-slot:default="itemSlots">
        <v-btn icon @click="doEditBill(itemSlots.item)">
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="doPrintBill(itemSlots.item)">
          <v-icon color="success">mdi-pdf-box</v-icon>
        </v-btn>
        <v-btn class="ml-3" icon>
          <v-icon color="error" @click="delBill(itemSlots.item.id)">
            mdi-rotate-45 mdi-plus
          </v-icon>
        </v-btn>
      </template>
    </List>

    <Popup :data="popup" @close="closePopup" />
    <PdfCreater :data="pdf" @close="closePdf" />
  </div>
</template>

<script>
import List from "@/components/List";
import Popup from "@/components/Popup";
import PdfCreater from "@/components/PdfCreater";

export default {
  components: { List, Popup, PdfCreater },
  head: {
    title: "Счета",
  },
  created() {
    this.$store.commit("setTitle", "Счета");
    this.$store.dispatch("client/getClientList");
    this.$store.dispatch("bill/getBillList");
  },
  data() {
    return {
      headers: [
        { text: "№", value: "numb" },
        { text: "Дата", value: "date" },
        { text: "Клиент", value: "client.name" },
        { text: "Сумма", value: "sum" },
        { text: "Налоги", value: "gross" },
        { text: "", value: "action", sortable: false },
      ],
      popup: {
        show: false,
        edit: false,
        width: "1050px",
        name: "bill",
        title: "Счета",
      },
      pdf: {
        show: false,
        data: false,
      },
      temp: null,
      selectNameControls: "Счета: Всех клиентов",
      selectId: "all",
    };
  },
  computed: {
    clientsMenu() {
      return [
        { id: "all", name: "Все клиенты" },
        ...this.$store.getters[`client/list`],
      ];
    },
  },
  methods: {
    doAddBill() {
      this.popup.title = "Добавление нового счета";
      this.popup.edit = {
        numb: null,
        date: new Date().toLocaleDateString(),
        client: null,
        task: [],
        sum: 0,
      };
      this.popup.show = true;
    },
    doEditBill(item) {
      this.popup.title = "Редакирование счета";
      this.popup.edit = { ...item };
      this.popup.show = true;
    },
    doPrintBill(item) {
      this.pdf = {
        show: true,
        data: {
          owner: this.$store.getters["auth/user"].legal,
          bill: item,
        },
      };
    },
    delBill(id) {
      this.$store.dispatch("bill/delete", id);
    },
    closePopup() {
      this.popup.show = false;
      this.popup.edit = false;
    },
    closePdf() {
      this.pdf = {
        show: false,
        data: false,
      };
    },
    showClientTasks(item) {
      this.selectNameControls = `Счета: ${item.name}`;
      this.selectId = item.id;
    },
  },
};
</script>