<template>
  <div>
    <v-row>
      <v-col cols="12">
        {{ label }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center justify-center" cols="6">
        <span class="mr-4 text-h4">{{ timer.str }}</span>
        <v-btn v-if="!isStarted" icon @click="timerStart()">
          <v-icon color="green">mdi-play-circle-outline</v-icon>
        </v-btn>
        <v-btn v-else icon @click="timerStop()">
          <v-icon color="red">mdi-stop-circle-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="timerValue"
          return-masked-value
          v-mask="'##:##:##'"
          @input="$emit('input', timerValue)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    value: Number,
    id: String,
    label: String,
    entity: String,
  },
  data() {
    return {
      isStarted: false,
      interval: null,
      timerValue: "00:00:00",
      timer: {
        int: 0,
        str: "00:00:00",
      },
    };
  },
  methods: {
    timerStart() {
      let time = new Date().getTime();
      this.isStarted = true;

      window.localStorage.setItem(`timer_${this.id}`, time);

      this.interval = setInterval(() => {
        this.timerUpdate();
      }, 1000);
    },
    timerStop() {
      clearInterval(this.interval);
      this.timerValue = this.timeToStr(
        this.timeToInt(this.timerValue) + this.timer.int
      );

      this.$emit('input', this.timerValue)
      this.$store.dispatch(`${this.entity}/update`, {
        id: this.id,
        data: {
          time: this.timerValue,
        },
      });

      window.localStorage.removeItem(`timer_${this.id}`);
      this.isStarted = false;
      this.timer = {
        int: 0,
        str: "00:00:00",
      };
    },
    timerUpdate() {
      this.timer.int = new Date().getTime() - this.getTime();
      this.timer.str = this.timeToStr(this.timer.int);
    },
    timeToStr(val) {
      let hour = Math.floor(val / 3600000).toString();
      if (hour.length == 1) hour = `0${hour}`;
      val = val % 3600000;

      let minut = Math.floor(val / 60000).toString();
      if (minut.length == 1) minut = `0${minut}`;
      val = val % 60000;

      let second = Math.round(val / 1000).toString();
      if (second.length == 1) second = `0${second}`;

      return `${hour}:${minut}:${second}`;
    },
    timeToInt(val) {
      let result = 0;
      let timeArr = val.split(":");

      result += timeArr[0] * 3600000;
      result += timeArr[1] * 60000;
      result += timeArr[2] * 1000;

      return result;
    },
    getTime() {
      return window.localStorage.getItem(`timer_${this.id}`);
    }
  },
};
</script>