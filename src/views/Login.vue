<template>
  <v-app>
    <div class="appbox">
      <div class="wrapper">
        <h2>Panel logowania</h2>
        <div class="d-flex align-center justify-center">
          <form>
            <v-text-field
              class="field"
              v-model="name"
              :error-messages="nameErrors"
              label="Nazwa użytkownika"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              autocomplete="off"
            ></v-text-field>
            <v-text-field
              class="field"
              type="password"
              v-model="password"
              :error-messages="passwordErrors"
              label="Hasło"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              autocomplete="off"
            ></v-text-field>
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Nie jestem robotem"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>

            <v-btn
              rounded
              color="primary"
              v-if="checkAllField"
              class="mr-4"
              @click.prevent="submit"
              disabled
              >Zaloguj</v-btn
            >
            <v-btn
              rounded
              color="primary"
              v-else
              class="mr-4"
              @click.prevent="submit"
              >Zaloguj</v-btn
            >
            <div v-if="loginWithErr" class="errorLogin">
              <p class="">Nie ma takiego użytkownika!!</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
// import walidacji
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

// import Vuex store
import store from "../store";
// import funkcji hashujacej
//import {sha256} from "js-sha256";
export default {
  name: "Login",
  store,
  // stan wewnetrzny komponentu
  data: () => ({
    // model dla inputa usernama
    name: "",
    // model dla inputa hasla
    password: "",
    // model dla checkboxa
    checkbox: false,
    // model dla paragrafu errora przy logowaniu uzytkownika
    //loginWithErr: store.getters.loginWithErr,
  }),

  methods: {
    // metoda wywolywana na onclicku
    submit() {
      // obiekt przygotowany do wysłania dispatcherem
      const user = {
        // nazwa usera
        username: this.name,
        // zahashowane hasło usera
        password: this.password,
      };
      // wywolanie akcji 'login' w globalnym store Vuexa z dodatkowymi danymi usera
      store.dispatch("login", user);
    },
  },

  // sekcja walidacji i informacji dla uzytkownika
  computed: {
    loginWithErr: function () {
      return store.getters.loginWithErr;
    },
    // sprawdzenie czy user wpisal cos w wszystkie pola
    checkAllField() {
      if (this.name !== "" && this.password !== "" && this.checkbox)
        return false;
      else return true;
    },
    // sprawdzenie checkboxa
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked &&
        errors.push("Musisz potwierdzić, że nie jesteś robotem!");
      return errors;
    },
    // sprawdzenie nazwy uzytkownika
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Nazwa użytkownika jest wymagana.");
      return errors;
    },
    // sprawdzenie hasła
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Hasło jest wymagane");
      return errors;
    },
  },

  // mixin walidacji
  mixins: [validationMixin],

  // pola do walidacji
  validations: {
    name: {
      required,
    },
    password: {
      required,
    },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.appbox {
  width: 100%;
  height: 100%;
  background-image: url("../assets/login-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 100px;
    width: 40%;
    height: 450px;
    background-color: #ffffff;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    padding: 20px 20px;

    h2 {
      padding: 10px 10px;
    }

    div {
      width: 100%;

      form {
        width: 80%;
        height: 100%;

        button {
          margin-top: 20px;
        }
      }

      p {
        margin-top: 20px;
        color: #d50000;
      }
    }
  }
}

// Extra small devices (portrait phones, less than 576px)
@media (max-width: $extraSmall) {
  .appbox {
    .wrapper {
      width: 90%;
    }
  }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: $smallMin) and (max-width: $smallMax) {
  .appbox {
    .wrapper {
      width: 70%;
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: $mediumMin) and (max-width: $mediumMax) {
  .appbox {
    .wrapper {
      width: 60%;
    }
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: $largeMin) and (max-width: $largeMax) {
  .appbox {
    .wrapper {
      width: 50%;
    }
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: $extraLarge) {
  .appbox {
    .wrapper {
      width: 40%;
    }
  }
}
</style>
