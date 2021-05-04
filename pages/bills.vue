<template>
  <div>
    <List itemsName="bill/list" :headers="headers">
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
  created() {
    this.$store.commit("setTitle", "Счета");
    this.$store.dispatch("bill/getBillList");
    this.$store.dispatch("bill/getBillsCounter");
    this.$store.dispatch("client/getClientList");
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
    };
  },
  methods: {
    doAddBill() {
      this.popup.title = "Добавление нового счета";
      this.popup.edit = {
        numb: this.$store.getters[`bill/billsCounter`],
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
          owner: this.$store.getters["client/get"]("hgNIKngBduiR0g1PRlr1"),
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
  },
};
</script>