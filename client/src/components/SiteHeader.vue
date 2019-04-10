<template>
  <header class="site-header">
    <h1>AdAlpha Technical Test</h1>
    <a v-if="isLoggedIn" @click.prevent="handleLogoutClick">Logout</a>
  </header>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { showSuccessToast } from "../services/toastSvc";

@Component
export default class SideHeader extends Vue {
  @Prop() isLoggedIn!: boolean;

  handleLogoutClick(): void {
    this.$emit("user-logged-out");
    showSuccessToast("Logged out ok!");
  }
}
</script>
<style scoped>
.site-header {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

a {
  color: #fff;
}

a:link,
a:visited {
  color: #fff;
  text-decoration: none;
}

a:hover,
a:active {
  color: #fff;
  text-decoration: underline;
}
</style>
