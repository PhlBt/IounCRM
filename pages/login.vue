<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12" v-if="confirmationResult === null">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title> Авторизация </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="phone"
              id="phone"
              label="Телефон"
              name="phone"
              prepend-icon="mdi-cellphone-key"
              type="phone"
              maxlength="12"
              @focus="phoneMask(true)"
              @blur="phoneMask(false)"
              @keyup.enter="login()"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn id="login-btn" color="primary" @click="login()">Войти</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="elevation-12" v-else>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title> Введите код из смс сообщения </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="code"
              id="code"
              label="Код"
              name="code"
              @keyup.enter="codeConfirm()"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="codeConfirm()">Подтвердить</v-btn>
          <v-btn color="error" @click="again()">Отменить</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  layout: "thin",
  name: "login",
  components: { VueRecaptcha },
  head() {
    return {
      script: [
        {
          src:
            "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
          async: true,
          defer: true,
        },
      ],
    };
  },
  data: function () {
    return {
      phone: "",
      code: "",
      captcha: null,
      confirmationResult: null,
    };
  },
  mounted() {
    this.captcha = new this.$fireModule.auth.RecaptchaVerifier("login-btn", {
      size: "invisible",
    });
  },
  methods: {
    login: function () {
      this.$fire.auth
        .signInWithPhoneNumber(this.phone, this.captcha)
        .then((result) => {
          this.confirmationResult = result;
        })
        .catch((error) => console.log(error));
    },
    codeConfirm: function () {
      this.confirmationResult
        .confirm(this.code)
        .then(() => {this.$router.push('/login')})
        .catch((error) => console.log(error));
    },
    again: function () {
      this.confirmationResult = null;
    },
    phoneMask: function (status) {
      if (status) {
        this.phone =
          this.phone.substring(0, 2) !== "+7" ? `+7${this.phone}` : this.phone;
      } else {
        this.phone = this.phone.length > 2 ? this.phone : "";
      }
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
</style>