<template>
  <div class="overflow-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
        <tr>
          <th scope="col" class="py-3 px-6">
            Name
          </th>
          <th scope="col" class="py-3 px-6">
            Phone
          </th>
          <th scope="col" class="py-3 px-6">
            Email
          </th>
          <th scope="col" class="py-3 px-6">
            Nº Repairs
          </th>
          <th scope="col" class="py-3 px-6">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <ClientsTValues></ClientsTValues>
      </tbody>
    </table>
  </div>
</template>

<script>

import ClientsTValues from "@/components/Clients/ClientsTValues";

export default {
  name: "ClientTable",
  components: {
    ClientsTValues
  }
}
</script>

<style scoped>

</style>