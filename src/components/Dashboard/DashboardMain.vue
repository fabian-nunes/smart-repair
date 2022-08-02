<template>
  <section class="m-6">

    <div class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-600 rounded-2xl m-5">
      <h2 class="text-white flex justify-center font-bold text-2xl">Repairs</h2>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <CardBody tRepair="0"></CardBody>
      <CardBody tRepair="1"></CardBody>
      <CardBody tRepair="2"></CardBody>
    </div>

    <div class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-600 rounded-2xl m-5">
      <h2 class="text-white flex justify-center font-bold text-2xl">Clients</h2>
    </div>

  </section>
</template>

<script>

import CardBody from "@/components/Dashboard/CardBody";

export default {
  name: "DashboardMain",
  components: {
    CardBody
  }
}
</script>

<style scoped>

</style>