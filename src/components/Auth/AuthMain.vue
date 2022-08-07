<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 m-auto md:h-[75vh] lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Authenticate to access Smart Repair!
          </h1>
         <LoginForm v-if="mode === 0" @change-form="changeForm(1)"></LoginForm>
         <RegisterForm v-else @change-form="changeForm(0)"></RegisterForm>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";

export default {
  name: "AuthMain",
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      mode: 0,
    };
  },
  methods: {
    changeForm(type) {
      this.mode = type;
    }
  }
}
</script>

<style scoped>

</style>