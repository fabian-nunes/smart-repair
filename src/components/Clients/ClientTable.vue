<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="flex justify-center">
      <SearchBar @filterData="filterTable"></SearchBar>
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
              Phone
            </th>
            <th scope="col" class="py-3 px-6">
              Email
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                Nº Repairs
                <a href="#" @click="sortTabel"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
              </div>
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
          <ClientsTValues ref="tableValues"></ClientsTValues>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import ClientsTValues from "@/components/Clients/ClientsTValues";
import SearchBar from "@/components/Clients/SearchBar";

export default {
  name: "ClientTable",
  components: {
    ClientsTValues,
    SearchBar
  },
  methods: {
    sortTabel() {
      this.$refs.tableValues.sortRepairs();
    },
    filterTable(e) {
      this.$refs.tableValues.filterTable(e);
    }
  },
}
</script>

<style scoped>

</style>