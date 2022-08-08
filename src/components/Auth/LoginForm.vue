<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input type="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
      <input type="password" v-model="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
    </div>
    <button type="submit" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign in</button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Don’t have an account yet? <button @click="$emit('changeForm')" class="font-medium text-primary-600 text-green-600 hover:underline dark:text-primary-500">Sign up</button>
    </p>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  emits: ["changeForm"],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      await this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });

      if (this.$store.getters["auth/getError"]) {
        this.error('Login Failed');
      } else {
        localStorage.setItem("token", this.$store.getters["auth/getToken"]);
        this.success();
        this.$router.replace("/");
      }
    },

    success() {
      this.$swal({
        title: 'Success!',
        text: 'User logged in successfully',
        icon: 'success',
        button: 'OK'
      });
    },
    error(message) {
      this.$swal({
        title: 'Error!',
        text: message,
        icon: 'error',
        button: 'OK'
      });
    },
  }
}
</script>

<style scoped>

</style>