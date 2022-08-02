<template>
  <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" v-if="tRepair === '0'">Repairs To Do</h5>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" v-else-if="tRepair === '1'">Repairs in Progress</h5>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" v-else-if="tRepair === '2'">Repairs to be paid</h5>
    <CardData :status="tRepair"></CardData>
  </a>
</template>

<script>
import CardData from "@/components/Dashboard/CardData";

export default {
  name: "CardBody",
  components: {
    CardData
  },
  props: {
    tRepair: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>

</style>