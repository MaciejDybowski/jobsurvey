<template>
<v-app>
    <div class="wrapper">
        <div class="d-flex align-center justify-center">
            <form>
                <v-text-field v-model="name" :error-messages="nameErrors" label="Nazwa użytkownika" required @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>
                <v-text-field type="password" v-model="password" :error-messages="emailErrors" label="Hasło" required @input="$v.password.$touch()" @blur="$v.password.$touch()" autocomplete="on"></v-text-field>
                <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Nie jestem robotem" required @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

                <v-btn class="mr-4" @click.prevent="submit">Zaloguj</v-btn>
            </form>
        </div>
    </div>
</v-app>
</template>

<script>
import {
    validationMixin
} from "vuelidate";
import {
    required
} from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],

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

    data: () => ({
        name: "",
        password: "",
        checkbox: false,
    }),

    computed: {
        checkboxErrors() {
            const errors = [];
            if (!this.$v.checkbox.$dirty) return errors;
            !this.$v.checkbox.checked &&
                errors.push("Musisz potwierdzić, że nie jesteś robotem!");
            return errors;
        },

        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push("Nazwa użytkownika jest wymagana.");
            return errors;
        },

        emailErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push("Hasło jest wymagane");
            return errors;
        },
    },

    methods: {
        submit() {
            this.$v.$touch();
            console.log(
                `twoja nazwa uzytkownika to ${this.name} a haslo to ${this.password}`
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    margin: auto;
    width: 50%;
    height: 400px;
    background-color: gold;
    padding: 20px 20px;

    div {
        form {
            width: 80%;
        }
    }
}
</style>
