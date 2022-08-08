<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="submit">
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input type="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
      <input type="password" v-model="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
    </div>
    <div>
      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
      <input type="password" v-model="confirmPassword" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
    </div>
    <button type="submit" class="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Create an account</button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Already have an account? <button @click="$emit('changeForm')" class="font-medium text-primary-600 text-blue-600 hover:underline dark:text-primary-500">Login here</button>
    </p>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  emits: ["changeForm"],
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async submit() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
      } else {
        await this.$store.dispatch("auth/register", {
          email: this.email,
          password: this.password,
        });

        if (this.$store.getters["auth/getError"]) {
          this.error(this.$store.getters["auth/getErrorMessage"]);
        } else {
          localStorage.setItem("token", this.$store.getters["auth/getToken"]);
          this.success();
          this.$router.replace("/");
        }

        //alert(this.$store.getters["auth/getToken"]);
      }
    },
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Account created successfully!',
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
  },
}
</script>

<style scoped>

</style>