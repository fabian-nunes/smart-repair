<template>
  <section class="h-[75vh]">

    <div class="m-6">
      <DashBadge></DashBadge>

      <DashGraphic class="flex justify-center"></DashGraphic>

    </div>

  </section>
</template>

<script>

import DashBadge from "@/components/Dashboard/DashBadge";
import DashGraphic from "@/components/Dashboard/DashGraphic";

export default {
  name: "DashboardMain",
  components: {
    DashBadge,
    DashGraphic
  }
}
</script>

<style scoped>

</style>