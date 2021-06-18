<template>
  <v-flex class="col-10 offset-1 mt-6">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        :hide-default-footer="this.items.length < 11"
        :sort-by="['numb']"
        :sort-desc="[true]"
      >
        <template v-slot:[`header.action`]>
          <div class="d-flex justify-end">
            <slot name="headerAction" />
          </div>
        </template>

        <template v-slot:[`item.sum`]="{ item }">
          {{ item.sum || 0 }} руб.
        </template>

        <template v-slot:[`item.gross`]="{ item }">
          {{ item.gross || 0 }} руб.
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <div class="d-flex justify-end">
            <slot v-bind:item="item" />
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "List",
  props: {
    itemsName: String,
    headers: Array,
    select: String,
  },
  computed: {
    items: function () {
      if (this.select === undefined || this.select === "all")
        return this.$store.getters[`${this.itemsName}`];

      let result = [];
      this.$store.getters[`${this.itemsName}`].forEach((element) => {
        if (element.client.id === this.select) result.push(element);
      });
      return result;
    },
  },
};
</script>