<template>
  <section class="m-6 h-[75vh]">
    <RepairsBadge></RepairsBadge>
    <RepairABTN @open="open"></RepairABTN>
    <div class="flex justify-center" v-if="render">

    </div>
    <Teleport to="body">
      <ModalRC :show="show" @close="close" @reRender="reRender"></ModalRC>
    </Teleport>
  </section>
</template>

<script>

import RepairsBadge from "@/components/Repairs/RepairsBadge";
import RepairABTN from "@/components/Repairs/RepairABTN";
import ModalRC from "@/components/Repairs/ModalRC";

export default {
  name: "RepairsMain",
  components: {
    RepairsBadge,
    RepairABTN,
    ModalRC
  },
  data() {
    return {
      show: false,
      render: true
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    reRender() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    },
  }
}
</script>

<style scoped>

</style>