<template>
  <div>

    <List itemsName="client/list" :headers="headers">
      <template v-slot:[`headerAction`]>
        <v-btn color="secondary" @click="doAddClient()"> Добавить </v-btn>
      </template>

      <template v-slot:default="itemSlots">
        <v-btn icon @click="doEditClient(itemSlots.item)">
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="ml-3" icon>
          <v-icon color="error" @click="delClient(itemSlots.item.id)">
            mdi-rotate-45 mdi-plus
          </v-icon>
        </v-btn>
      </template>
    </List>

    <Popup
      :data="popup"
      @close="closePopup"
      />

  </div>
</template>

<script>
import List from "@/components/List"
import Popup from "@/components/Popup"

export default {
  components: { List, Popup },
  created() {
    this.$store.commit("setTitle", "Клиенты")
    this.$store.dispatch("client/getClientList")
  },
  data() {
    return {
      headers: [
        { text: "Название", value: "name" },
        { text: "Юридическое название", value: "legalName" },
        { text: "Телефон", value: "phone" },
        { text: "Адрес", value: "address" },
        { text: "Сумма", value: "sum" },
        { text: "", value: "action", sortable: false },
      ],
      popup: {
        show: false,
        edit: false,
        name: 'client',
        title: 'Клиент'
      }
    }
  },
  methods: {
    doAddClient() {
      this.popup.title = 'Добавление нового клиента'
      this.popup.edit = false
      this.popup.show = true
    },
    doEditClient(item) {
      this.popup.title = 'Редакирование клиента'
      this.popup.edit = item
      this.popup.show = true
    },
    delClient(id) {
      this.$store.dispatch('client/delete', id)
    },
    closePopup() {
      this.popup = {
        show: false,
        edit: false,
        name: 'client',
        title: 'Клиент'
      }
    }
  },
};
</script>