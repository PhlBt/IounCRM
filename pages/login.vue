<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="3">
      <v-card class="elevation-12">
        <v-tabs fixed-tabs dark background-color="primary">
          <v-tab @click="authReg = true">
            <v-icon class="mr-3">mdi-account-key-outline</v-icon>
            Авторизация
          </v-tab>
          <v-tab @click="authReg = false">
            <v-icon class="mr-3">mdi-account-plus-outline</v-icon>
            Регистрация
          </v-tab>
        </v-tabs>
        <div v-if="authReg">
          <v-card-text>
						<v-form ref="auth" @keyup.enter="auth()">
              <v-text-field
                v-model="email"
                id="email"
                label="Почта"
                name="email"
                prepend-icon="mdi-email-outline"
                type="email"
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-form-textbox-password"
                type="password"
                minlength="4"
                :rules="rules.password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center mb-3">
            <v-btn class="w-50" id="login-btn" color="primary" @click="auth()">
              Войти
            </v-btn>
          </v-card-actions>
        </div>
				<div v-else>
          <v-card-text>
						<v-form ref="reg" @keyup.enter="reg()">
              <v-text-field
                v-model="email"
                id="email"
                label="Почта"
                placeholder="Почта"
                name="email"
                prepend-icon="mdi-email-outline"
                type="email"
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-form-textbox-password"
                type="password"
                minlength="4"
                :rules="rules.password"
              ></v-text-field>
							<v-container>
								<v-row>
									<v-text-field
										class="w-45"
										v-model="name"
										id="name"
										label="Имя"
										name="name"
										prepend-icon="mdi-account-outline"
										type="name"
										:rules="rules.name"
									></v-text-field>
									<v-text-field
										class="w-45"
										v-model="project"
										id="project"
										label="Проект"
										name="project"
										prepend-icon="mdi-folder-outline"
										type="project"
										minlength="4"
										:rules="rules.project"
									></v-text-field>
								</v-row>
							</v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center mb-3">
            <v-btn class="w-50" id="login-btn" color="primary" @click="reg()">
              Зарегистрироваться
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "thin",
  name: "login",
  data: function () {
    return {
			authReg: true,
			name: "",
      email: "",
			password: "",
      project: "",
      rules: {
        name: [(v) => !!v || "Имя необходимо заполнить"],
        email: [(v) => !!v || "Почту необходимо заполнить"],
        password: [
					(v) => !!v || "Пароль необходимо заполнить",
					(v) => (v || '').length >= 6 || "Пароль должен содержать больше 6 символов"
				],
        project: [(v) => !!v || "Проект необходимо заполнить"],
      },
    };
  },
  computed: {
    isAuth: function () {
      return this.$store.getters['auth/isAuthed']
    }
  },
  watch: {
    isAuth: function () {
      if (this.isAuth) this.$router.push("/")
    }
  },
  methods: {
    auth: function() {
      if (!this.$refs["auth"].validate()) return

			this.$fire.auth
				.signInWithEmailAndPassword(this.email, this.password)
				.catch((error) => console.log(error))
    },
		reg: function() {
      if (!this.$refs["reg"].validate()) return

			this.$fire.auth
				.createUserWithEmailAndPassword(this.email, this.password)
				.then((userCredential) => {
					this.$fire.firestore.collection("users")
						.doc(userCredential.user.uid).set({
							name: this.name,
							project: this.project,
						})
				})
				.catch((error) => console.log(error))
		}
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