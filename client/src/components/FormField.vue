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
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FormField extends Vue {
  @Prop() value!: string; /* For v-model support */
  @Prop() id!: string;
  @Prop() labelText!: string;
  @Prop() type!: string;
  @Prop() narrow!: boolean;
  @Prop() validationError!: string;

  // Methods
  handleInput(e: any): void {
    /* Other half of v-model support */
    this.$emit("input", e.target.value);
  }

  // Computed
  get hasValidationError(): boolean {
    if (this.validationError) {
      return true;
    }
    return false;
  }

  get classes() {
    return {
      error: this.hasValidationError
    };
  }
}
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
