<template>
  <RouterView data-theme=""></RouterView>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Dashboard from "./components/pages/Dashboard.vue";
import Login from "./components/auth/Login.vue";
import MainLayout from "./components/layouts/MainLayout.vue";

export default {
  components: {
    MainLayout,
    Dashboard,
    Login,
    RouterView,
    RouterLink,
  },
  setup() {
    
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
