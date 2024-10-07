<template>
  <div data-theme="cyberpunk" class="h-screen flex justify-center">
    <!-- App
    <Dashboard 
      :Days="Days" 
      Text="Text from App" 
      Color="blue-500" 
      class="border-2 border-green-600 p-5 m-3"
      >
      <p>This is slot</p>
    </Dashboard> -->
    <Login></Login>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";

export default {
  components: {
    Dashboard,
    Login
  },
  setup() {
    const Days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Monday",
    ];

    return {Days};
  },
};
</script>

<style lang="scss" scoped></style>
