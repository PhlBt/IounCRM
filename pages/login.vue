<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="3">
      <v-card class="elevation-12">
        <v-tabs fixed-tabs dark background-color="primary">
          <v-tab @click="setType(true)">
            <v-icon class="mr-3">mdi-account-key-outline</v-icon>
            Авторизация
          </v-tab>
          <v-tab @click="setType(false)">
            <v-icon class="mr-3">mdi-account-plus-outline</v-icon>
            Регистрация
          </v-tab>
        </v-tabs>
        <v-form ref="form" @keyup.enter="doAction()">
          <v-slide-y-transition group tag="v-card-text" class="overflow-hidden">
            <v-text-field
              v-if="!type"
              v-model="name"
              id="name"
              key="name"
              label="Ваше имя"
              name="name"
              prepend-icon="mdi-account-outline"
              type="name"
              autocomplete="off"
              :rules="rules.name"
            ></v-text-field>
            <v-text-field
              v-model="email"
              id="email"
              label="Ваша почта"
              name="email"
              key="email"
              prepend-icon="mdi-email-outline"
              type="email"
              :rules="rules.email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              id="password"
              label="Ваш пароль"
              name="password"
              key="password"
              prepend-icon="mdi-form-textbox-password"
              type="password"
              minlength="4"
              :rules="rules.password"
            ></v-text-field>
          </v-slide-y-transition>
          <v-card-actions class="d-flex justify-center mb-3">
            <v-btn
              class="w-50"
              id="login-btn"
              color="primary"
              @click="doAction()"
            >
              {{ type ? "Войти" : "Зарегистрироваться" }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "thin",
  name: "login",
  head: {
    title: "Добро пожаловать",
  },
  data: function () {
    return {
      type: true,
      name: "",
      email: "",
      password: "",
      project: "",
      rules: {
        name: [(v) => !!v || "Имя необходимо заполнить"],
        email: [(v) => !!v || "Почту необходимо заполнить"],
        password: [
          (v) => !!v || "Пароль необходимо заполнить",
          (v) =>
            (v || "").length >= 6 ||
            "Пароль должен содержать больше 6 символов",
        ],
        project: [(v) => !!v || "Проект необходимо заполнить"],
      },
    };
  },
  created() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 16; i++) {
      this.project += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuthed"];
    },
  },
  watch: {
    isAuth: function () {
      if (this.isAuth) this.$router.push("/");
    },
  },
  methods: {
    doAction() {
      if (!this.$refs.form.validate()) return;
      (this.type) 
        ? this.auth()
        : this.reg()
    },
    auth() {
      this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
    },
    reg() {
      this.$store.dispatch("auth/registration", {
        email: this.email,
        password: this.password,
        name: this.name,
        project: this.project,
      });
    },
    setType(type) {
      this.type = type;
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus input:-webkit-autofill,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 0;
  transition: background-color 5000s ease-in-out 0s;
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 174, 255, 0.04) 50%,
    rgba(255, 255, 255, 0) 51%,
    rgba(0, 174, 255, 0.03) 100%
  );
  color: #ffffff !important;
  -webkit-text-fill-color: rgb(255, 255, 255);
}
.overflow-hidden {
  overflow: hidden;
}
</style>