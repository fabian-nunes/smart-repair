<template>
  <section class="mt-6">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-gray-900 dark:text-primary-500">404</h1>
        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl  text-gray-900">Something's missing.</p>
        <p class="mb-4 text-lg font-light text-gray-600 dark:text-gray-600">Sorry, we can't find that page. Please return to the homepage. </p>
        <button @click="this.$router.replace('/')" class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Return to the Homepage
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Error404Page"
}
</script>

<style scoped>

</style>