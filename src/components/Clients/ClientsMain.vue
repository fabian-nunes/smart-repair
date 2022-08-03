<template>
  <section class="m-6 h-[75vh]">
    <ClientBadge></ClientBadge>
    <ClientABTN @open="open"></ClientABTN>
    <div class="flex justify-center">
      <ClientTable class="w-1/2 h-1/2"></ClientTable>
    </div>
    <Teleport to="body">
      <ModalCC :show="show" @close="close"></ModalCC>
    </Teleport>
  </section>
</template>

<script>

import ClientTable from "@/components/Clients/ClientTable";
import ClientBadge from "@/components/Clients/ClientBadge";
import ClientABTN from "@/components/Clients/ClientABTN";
import ModalCC from "@/components/Clients/ModalCC";

export default {
  name: "ClientsMain",
  components: {
    ClientTable,
    ClientBadge,
    ClientABTN,
    ModalCC
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
}
</script>

<style scoped>

</style>