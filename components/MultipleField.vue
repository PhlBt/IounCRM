<template>
  <div>
    <v-row>
      <v-col cols="10">
        {{ label }}
      </v-col>
      <v-col cols="2" class="d-flex jusify-end">
        <v-btn small @click="addNewRow()">
          <v-icon color="success">mdi-plus</v-icon>
          Добавить
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-for="(itemEd, indexEd) in edit" :key="indexEd">
      <v-col
        :class="`py-0 order-${desc[index].sort}`"
        v-for="(item, index) in itemEd"
        :key="index"
        :cols="desc[index].cols"
      >
        <v-textarea
          v-if="desc[index].type === 'textarea'"
          auto-grow
          v-model="itemEd[index]"
          autocomplete="off"
          :label="desc[index].label"
          @change="update()"
          clear-icon="mdi-close-circle"
          rows="1"
          row-height="15"
        ></v-textarea>

        <v-text-field
          v-else-if="
            desc[index].type === 'string' || desc[index].type === 'number'
          "
          :type="desc[index].type === 'number' ? 'number' : 'text'"
          v-model="itemEd[index]"
          autocomplete="off"
          :label="desc[index].label"
          @change="update()"
        />

        <v-text-field
          v-else-if="desc[index].type === 'text'"
          readonly
          v-model="itemEd[index]"
          autocomplete="off"
          :label="desc[index].label"
        />
      </v-col>
      <v-col :cols="1" class="order-6">
        <v-btn icon @click="removeRow(indexEd)">
          <v-icon color="error"> mdi-rotate-45 mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "MultipleField",
  props: {
    value: Array,
    desc: Object,
    label: String,
    require: Boolean,
  },
  data() {
    return {
      edit: [],
    };
  },
  created() {
    this.setEdit();
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.setEdit();
      },
    },
  },
  methods: {
    update() {
      this.rowSumUpdate();
      this.$emit("input", this.edit);
    },
    rowSumUpdate() {
      this.edit.forEach(function (item) {
        item.sum =
          item.price > 0
            ? !item.count
              ? item.price
              : item.count * item.price
            : 0;
      });
    },
    setEdit() {
      if (this.value == null) return;
      this.edit = this.value.map((i) => {
        return { ...i };
      });
      if (!this.edit.length) this.addNewRow();
    },
    addNewRow() {
      let obj = {};
      for (let key in this.desc) obj[key] = "";
      this.edit.push(obj);
    },
    removeRow(item) {
      this.edit.splice(item, 1)
      this.update()
    }
  },
};
</script>