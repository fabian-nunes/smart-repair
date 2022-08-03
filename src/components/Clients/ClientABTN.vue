<template>
  <div class="flex justify-center m-8">
    <button type="button" @click="$emit('open')" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"  data-modal-toggle="authentication-modal">Add Client</button>
  </div>
</template>

<script>
export default {
  name: "ClientABTN",
  emits: ['open'],
}
</script>

<style scoped>

</style>