<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="flex justify-center">

    </div>
    <!-- ... -->
    <div>
      <div class="overflow-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
            <th scope="col" class="py-3 px-6">
              Name
            </th>
            <th scope="col" class="py-3 px-6">
              Price
            </th>
            <th scope="col" class="py-3 px-6">
              Client
            </th>
            <th scope="col" class="py-3 px-6">
              Status
            </th>
            <th scope="col" class="py-3 px-6">
              <span class="sr-only">Edit</span>
            </th>
            <th scope="col" class="py-3 px-6">
              <span class="sr-only">Delete</span>
            </th>
          </tr>
          </thead>
          <tbody>
            <RepairsTValues ref="tableValues"></RepairsTValues>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import RepairsTValues from "@/components/Repairs/RepairsTValues";

export default {
  name: "RepairTable",
  components: {
    RepairsTValues
  },
}
</script>

<style scoped>

</style>