<template>
  <v-dialog
    v-model="data.show"
    max-width="600px"
    persistent
    @click:outside="reset"
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ data.title }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form :ref="data.name">
            <v-row>
              <v-col
                v-for="(item, index) in value"
                :key="index"
                :cols="item.cols"
              >

                <v-text-field
                  v-if="item.type === 'string' || item.type === 'number'"
                  v-model="edit[index]"
                  autocomplete="off"
                  :rules="getRules(item)"
                  :label="item.label"
                />

                <!-- <v-text-field
                  v-if="item.type === 'time'"
                  v-model="editable[item.ref]"
                  :ref="item.ref"
                  autocomplete="off"
                  :suffix="item.suffix"
                  :rules="getRules(item.rules)"
                  :label="item.label"
                  type="time"
                />

                <v-text-field
                  v-if="item.type === 'phone'"
                  v-model="editable[item.ref]"
                  :ref="item.ref"
                  autocomplete="off"
                  prefix="+7"
                  :rules="getRules(item.rules)"
                  :label="item.label"
                />

                <v-text-field
                  v-if="item.type === 'password'"
                  v-model="editable[item.ref]"
                  :ref="item.ref"
                  autocomplete="off"
                  :suffix="item.suffix"
                  :rules="getRules(item.rules)"
                  :label="item.label"
                  append-outer-icon="mdi-account-key"
                  @click:append-outer="generatePassword(item.ref)"/>

                <v-select
                  v-if="item.type === 'select'"
                  v-model="editable[item.ref]"
                  :ref="item.ref"
                  :label="item.label"
                  :items="getOptions(item.items)"
                  item-text="name"
                  item-value="id"
                />

                <v-checkbox
                  v-if="item.type === 'bool'"
                  v-model="editable[item.ref]"
                  :label="item.label"
                ></v-checkbox> -->

              </v-col>
            </v-row>

          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <v-btn @click="save()">Сохранить</v-btn>
        <v-btn @click="reset()">Отменить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "Popup",
    props: {
      data: Object,
    },
    data() {
      return { 
        edit: {}
      }
    },
    computed: {
      value: function () {
        return this.$store.getters[`${this.data.name}/value`];
      }
    },
    watch: {
      'data': {
        deep: true,
        handler() {
          if (this.data.edit)
            this.edit = { ...this.data.edit }
          else
            for (let key in this.value)
              this.edit[key] = null
        }
      }
    },
    methods: {
      save() {
        if (!this.$refs[this.data.name].validate()) return false
        this.$store.dispatch(`${this.data.name}/save`, this.edit)
        this.reset()
      },
      reset() {
        this.$refs[this.data.name].reset()
        this.$emit('close')
      },
      getRules(item) {
        if (item.require) return [v => !!v || `Поле ${item.label} обязательно к заполнению.`]
      }
    }
  }
</script>