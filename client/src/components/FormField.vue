<template>
  <div class="form-field">
    <label
      class="form-field__label"
      :class="{ error: hasValidationError }"
      :for="id"
      >{{ labelText }}:</label
    >
    <input
      class="form-field__input"
      :class="{
        error: hasValidationError,
        'form-field__input--narrow': narrow
      }"
      :id="id"
      :type="type"
      :value="value"
      @input="handleInput"
    />
    <p class="error" v-if="hasValidationError">{{ this.validationError }}</p>
    <p></p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: String /* For v-model support */,
    id: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    narrow: {
      type: Boolean,
      default: false
    },
    validationError: String
  },
  computed: {
    hasValidationError() {
      if (this.validationError) {
        return true;
      }
      return false;
    },
    classes() {
      return {
        error: this.hasValidationErrors
      };
    }
  },
  methods: {
    handleInput(e: any) {
      this.$emit("input", e.target.value);
    }
  }
});
</script>
<style scoped>
.form-field__label {
  display: block;
  margin-bottom: 5px;
}

.form-field__label.error {
  color: red;
}

.form-field__input {
  margin-bottom: 15px;
  display: block;
  width: 100%;
  padding: 5px 10px;
  font-size: 2rem;

  border-radius: 5px;
}

.form-field__input--narrow {
  max-width: 200px;
}

.form-field__input.error {
  border-color: red;
  background-color: pink;
}

p.error {
  color: red;
  margin-top: -5px;
}
</style>
