<template>
  <p class="font-normal text-gray-700 dark:text-gray-400">{{repairs}}</p>
</template>

<script>
export default {
  name: "CardData",
  props: {
    status: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      repairs: 0
    };
  },
  mounted() {
    fetch("http://localhost:3000/repairs/status/" + this.status)
      .then(response => response.json())
      .then(data => {
        this.repairs = Object.keys(data).length;
      });
  },
}
</script>

<style scoped>

</style>