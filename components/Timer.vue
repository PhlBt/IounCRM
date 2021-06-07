<template>
  <div class="d-flex align-center">
    <span class="mr-2 text-h5">{{ timer }}</span>
    <v-btn v-if="!isStarted" icon @click="timerStart()">
      <v-icon color="green">mdi-play-circle-outline</v-icon>
    </v-btn>
    <v-btn v-else icon @click="timerStop()">
      <v-icon color="red">mdi-stop-circle-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    value: String,
    id: String,
    entity: String,
    test: Boolean,
  },
  data() {
    return {
      isStarted: false,
      interval: null,
      timer: "00:00:00",
    };
  },
  computed: {
    timerStatus() {
      return this.$store.getters["timerStatus"](this.id);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function() {
        this.check()
      },
    },
    timerStatus: function () {
      this.check();
    },
  },
  methods: {
    check() {
      if (this.getTime() !== null) {
        this.timer = this.timeToStr();
        this.isStarted = true;
        this.intervalStart();
      } else {
        this.timer = this.value;
        if (this.isStarted) {
          this.isStarted = false;
          clearInterval(this.interval);
        }
      }
      if (this.timer === undefined) this.timer = '00:00:00';
    },
    getTime() {
      return window.localStorage.getItem(`timer_${this.id}`);
    },
    timerStart() {
      let time = new Date().getTime();
      let currentTimer = this.timeToInt(this.timer);
      if (currentTimer > 0) time -= currentTimer;

      this.intervalStart();
      window.localStorage.setItem(`timer_${this.id}`, time);
      this.$store.commit('timerStatus', { id: this.id, value: true })
      this.isStarted = true;
    },
    timerStop() {
      clearInterval(this.interval);

      this.$emit("update", this.timer);
      this.$store.dispatch(`${this.entity}/update`, {
        id: this.id,
        data: {
          time: this.timer,
        },
      });

      window.localStorage.removeItem(`timer_${this.id}`);
      this.$store.commit('timerStatus', { id: this.id, value: false })
      this.isStarted = false;
    },
    timerUpdate() {
      this.timer = this.timeToStr();
    },
    intervalStart() {
      this.interval = setInterval(() => {
        this.timerUpdate();
      }, 1000);
    },
    timeToStr() {
      let val = new Date().getTime() - this.getTime();
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
  },
};
</script>