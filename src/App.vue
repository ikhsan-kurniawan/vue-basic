<template>
  <RouterView data-theme=""></RouterView>
</template>

<script>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import Dashboard from "./components/pages/Dashboard.vue";
import Login from "./components/auth/Login.vue";
import MainLayout from "./components/layouts/MainLayout.vue";
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, watch } from "vue";

export default {
  components: {
    MainLayout,
    Dashboard,
    Login,
    RouterView,
    RouterLink,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    function checkRedirect() {
      const token = localStorage.getItem('userToken');

      if (route.path === '/login' && token) {
          router.push({ name: 'Dashboard' });
          return;
      }

      if (route.path !== '/login' && !token) {
        router.push({ name: 'Login' });
      }
    }

    watch(
      () => route.path,
      (newPath, oldPath) => {
        checkRedirect()
      }
    )

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
