<template>
  <div class="login">
    <form @submit.prevent="handleSubmit" class="login__form">
      <h2>Login</h2>
      <p>Please enter your user details to login.</p>
      <form-field
        id="username"
        label-text="Username"
        v-model.trim="username"
        :validation-error="validationErrors.username"
      />
      <form-field
        id="password"
        label-text="Password"
        v-model.trim="password"
        type="password"
        :validation-error="validationErrors.password"
      />
      <div class="login__buttons">
        <button href class="btn btn-login">Login</button>
      </div>
      <transition name="slide">
        <p class="error" v-if="showSubmitError">
          {{ validationErrors.submit }}
        </p>
      </transition>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import FormField from "@/components/FormField.vue";
import { showSuccessToast, showErrorToast } from "../services/toastSvc";
import { LoginInputModel } from "../types/login";
import { login as svcLogin } from "../services/loginSvc";

export default Vue.extend({
  data: () => {
    return {
      username: "ADA123456789",
      password: "",
      validationErrors: {
        username: "",
        password: "",
        submit: ""
      }
    };
  },
  computed: {
    showSubmitError() {
      if (this.validationErrors.submit) {
        return true;
      }
      return false;
    }
  },
  components: {
    FormField
  },
  methods: {
    validateInputs(): boolean {
      let allOk = true;

      this.validationErrors.username = "";
      this.validationErrors.password = "";
      this.validationErrors.submit = "";

      /* Values are already trimmed by v-model so no need to check for whitespace */
      if (this.username === "") {
        this.validationErrors.username = "Please enter your username!";
        allOk = false;
      }
      if (this.password === "") {
        this.validationErrors.password = "Please enter your password!";
        allOk = false;
      }

      return allOk;
    },
    async handleSubmit() {
      if (this.validateInputs()) {
        try {
          // Attempt the login
          const credentials: LoginInputModel = {
            username: this.username,
            password: this.password
          };
          await svcLogin(credentials);
          this.username = "";
          this.password = "";

          // Handle successful login
          showSuccessToast("Logged in ok!");
          this.$emit("user-logged-in");
        } catch (ex) {
          // Handle failed login
          this.validationErrors.submit = "Unable to login. Please try again!";
          // TODO: Distinguish between invalid credentials and server error
          showErrorToast("Unable to login!");
        }
      } else {
        showErrorToast(
          "Unable to login - Please complete all required fields!"
        );
      }
    }
  }
});
</script>
<style scoped>
.login {
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.login__form {
  padding: 20px 30px;
  border: 2px solid #fff;
  border-radius: 10px;
  background-color: #efefef;
  box-shadow: 4px 4px 4px #333;
}

.login__buttons {
  text-align: center;
  padding-top: 10px;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}

p.error {
  text-align: center;
  color: red;
  margin-top: 20px;
  margin-bottom: 0;
}
</style>
