<template>
  <tr v-for="client in clients" :key="client.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ client.name }}
    </th>
    <td class="py-4 px-6">
      {{ client.phone }}
    </td>
    <td class="py-4 px-6">
      {{ client.email }}
    </td>
    <td class="py-4 px-6">
      {{ client.repairs.length }}
    </td>
    <td class="py-4 px-6 text-right">
      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ClientsTValues",
  data() {
    return {
      clients: [],
    };
  },
  mounted() {
    fetch("http://localhost:3000/clients")
      .then(response => response.json())
      .then(data => {
        this.clients = data;
      });
  }
}
</script>

<style scoped>

</style>